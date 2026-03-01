import styled from "styled-components"

export const Loading = () => {
  return (
    <LoadingStyle>
      Carregando dados...
    </LoadingStyle>
  )
}

const LoadingStyle = styled.div`{
  font-size: 0.95rem;
  font-weight: 500;
  color: #9ca3af; 
  animation: dashboard-pulse 1.6s ease-in-out infinite;
  text-align: center;
  padding: 24px 0;
}

@keyframes dashboard-pulse {
  0% { opacity: 0.5; }
  50% { opacity: 1; }
  100% { opacity: 0.5; }
}`