import { ImageResponse } from '@vercel/og'

export const runtime = 'edge'

// Configuração do tamanho da imagem (padrão favicon)
export const size = {
  width: 32,
  height: 32,
}
export const contentType = 'image/png'

// Geração do ícone via código
export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 20,
          background: '#0f172a', // Azul escuro (Navy) sofisticado
          width: '100%',
          height: '100%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#d4a574', // Dourado Premium
          borderRadius: '8px', // Bordas arredondadas (estilo App moderno)
        }}
      >
        ⚖️
      </div>
    ),
    { ...size }
  )
}