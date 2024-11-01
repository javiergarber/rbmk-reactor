import { useEffect, useRef } from 'react';
import Game from './game/Game';
import { useWindowDimensions } from './hooks/useWindowDimensions';

const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const gameManagerRef = useRef<Game | null>(null);
  const { width, height } = useWindowDimensions();

  useEffect(() => {
    const canvas = canvasRef.current;
    const canvasContext = canvas?.getContext('2d');

    if (canvas && canvasContext) {

      gameManagerRef.current = new Game(canvas, canvasContext);
    }

    // Opcional: cleanup para evitar fugas de memoria o problemas con múltiples instancias
    return () => {
      if (gameManagerRef.current) {
        // Aquí podrías realizar cualquier limpieza necesaria para tu instancia de Game
        // Por ejemplo, detener bucles de animación, eliminar eventos, etc.
        gameManagerRef.current.stopGameLoop();
        gameManagerRef.current = null;
      }
    };
  }, []);

  return <canvas width={width} height={height} ref={canvasRef} />;
};

export default GameCanvas;
