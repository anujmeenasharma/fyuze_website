// CanvasSimulation.jsx
import React, { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  simulationVertexShader,
  simulationFragmentShader,
  renderVertexShader,
  renderFragmentShader,
} from "./shaders.js";

const CanvasSimulation = () => {
  const containerRef = useRef();

  useEffect(() => {
    const scene = new THREE.Scene();
    const simScene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      preserveDrawingBuffer: true,
    });

    const pixelRatio = Math.min(window.devicePixelRatio, 2);
    const width = window.innerWidth * pixelRatio;
    const height = window.innerHeight * pixelRatio;

    renderer.setPixelRatio(pixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    containerRef.current.appendChild(renderer.domElement);

    const mouse = new THREE.Vector2();
    const mouseVelocity = new THREE.Vector2();
    const prevMouse = new THREE.Vector2();
    let frame = 0;

    const options = {
      format: THREE.RGBAFormat,
      type: THREE.FloatType,
      minFilter: THREE.LinearFilter,
      magFilter: THREE.LinearFilter,
      stencilBuffer: false,
      depthBuffer: false,
    };

    let rtA = new THREE.WebGLRenderTarget(width, height, options);
    let rtB = new THREE.WebGLRenderTarget(width, height, options);

    const simMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        mouse: { value: mouse },
        mouseVelocity: { value: mouseVelocity },
        resolution: { value: new THREE.Vector2(width, height) },
        time: { value: 0 },
        frame: { value: 0 },
      },
      vertexShader: simulationVertexShader,
      fragmentShader: simulationFragmentShader,
    });

    const renderMaterial = new THREE.ShaderMaterial({
      uniforms: {
        textureA: { value: null },
        textureB: { value: null },
      },
      vertexShader: renderVertexShader,
      fragmentShader: renderFragmentShader,
      transparent: true,
    });

    const plane = new THREE.PlaneGeometry(2, 2);
    const simQuad = new THREE.Mesh(plane, simMaterial);
    const renderQuad = new THREE.Mesh(plane, renderMaterial);

    simScene.add(simQuad);
    scene.add(renderQuad);

    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d", { alpha: true });

    const textTexture = new THREE.CanvasTexture(canvas);
    textTexture.minFilter = THREE.LinearFilter;
    textTexture.magFilter = THREE.LinearFilter;
    textTexture.format = THREE.RGBAFormat;

    const backgroundColor = "#fb7427";

    const drawSVGToCanvas = (img) => {
      ctx.fillStyle = backgroundColor;
      ctx.fillRect(0, 0, width, height);

      // Get original SVG size (intrinsic size)
      const imgWidth = img.naturalWidth;
      const imgHeight = img.naturalHeight;

      if (!imgWidth || !imgHeight) return;

      // Calculate scaling to fit SVG into canvas (preserving aspect ratio)
      const maxCanvasSize = Math.min(width, height) * 1.2; // 75% of canvas
      const aspect = imgWidth / imgHeight;

      let drawWidth = maxCanvasSize;
      let drawHeight = maxCanvasSize;

      if (aspect > 1) {
        // Wide SVG
        drawHeight = maxCanvasSize / aspect;
      } else {
        // Tall SVG
        drawWidth = maxCanvasSize * aspect;
      }

      // Draw centered
      ctx.drawImage(
        img,
        (width - drawWidth) / 2,
        (height - drawHeight) / 2,
        drawWidth,
        drawHeight
      );

      textTexture.needsUpdate = true;
    };

    const svgImage = new Image();
    svgImage.src = "/assets/img.png"; // Update path if needed
    svgImage.onload = () => {
      drawSVGToCanvas(svgImage);
    };

    const handleResize = () => {
      const newWidth = window.innerWidth * window.devicePixelRatio;
      const newHeight = window.innerHeight * window.devicePixelRatio;

      renderer.setSize(window.innerWidth, window.innerHeight);
      rtA.setSize(newWidth, newHeight);
      rtB.setSize(newWidth, newHeight);
      simMaterial.uniforms.resolution.value.set(newWidth, newHeight);

      camera.width = newWidth;
      camera.height = newHeight;

      canvas.width = newWidth;
      canvas.height = newHeight;

      // Redraw SVG on resized canvas
      if (svgImage.complete) {
        drawSVGToCanvas(svgImage);
      }
    };

    const handleMouseMove = (event) => {
      prevMouse.copy(mouse);
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -((event.clientY / window.innerHeight) * 2 - 1);
      mouseVelocity.x = mouse.x - prevMouse.x;
      mouseVelocity.y = mouse.y - prevMouse.y;
    };

    const handleMouseLeave = () => {
      mouse.set(0, 0);
      mouseVelocity.set(0, 0);
    };

    renderer.domElement.addEventListener("mousemove", handleMouseMove);
    renderer.domElement.addEventListener("mouseleave", handleMouseLeave);
    window.addEventListener("resize", handleResize);

    const animate = () => {
      simMaterial.uniforms.frame.value = frame++;
      simMaterial.uniforms.time.value = performance.now() / 1000;

      simMaterial.uniforms.textureA.value = rtA.texture;
      renderer.setRenderTarget(rtB);
      renderer.render(simScene, camera);

      renderMaterial.uniforms.textureA.value = rtB.texture;
      renderMaterial.uniforms.textureB.value = textTexture;

      renderer.setRenderTarget(null);
      renderer.render(scene, camera);

      [rtA, rtB] = [rtB, rtA];

      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      renderer.dispose();
      rtA.dispose();
      rtB.dispose();
      window.removeEventListener("resize", handleResize);
      renderer.domElement.removeEventListener("mousemove", handleMouseMove);
      renderer.domElement.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  return <div ref={containerRef} style={{ width: "100vw", height: "100vh" }} />;
};

export default CanvasSimulation;
