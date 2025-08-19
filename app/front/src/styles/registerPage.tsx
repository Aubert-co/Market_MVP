import styled from "styled-components";

export const StyleCreateStore = styled.div`
body {
  font-family: 'Roboto', sans-serif;
  background-color: #f0f0f0;
  margin: 0;
  padding: 0;
}

.main-container {
 
  text-align: center;
}

.benefits {
    padding: 20px;
    background-color: #ffffff;
    border-radius: 10px;
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
    margin: -50px auto 0;
    max-width: 1000px;
    margin-top: 1%;
    margin-bottom: 2%;
}

.benefits h2 {
  font-size: 1.8em;
  color: #333;
  margin-bottom: 20px;
}

.benefits-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
}

.benefit-box {
  background-color: #f9f9f9;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 500px;
  text-align: center;
  transition: transform 0.3s, box-shadow 0.3s;
  cursor:pointer;
}

.benefit-box img {
  max-width: 100%;
  height: 80px;
  object-fit: cover;
  border-radius: 10px;
  margin-bottom: 10px;
}

.benefit-box p {
  font-size: 1em;
  color: #555;
  margin-top: 10px; 
  margin-bottom: 0; 
}


.benefit-box:hover {
  transform: translateY(-10px);
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
}
.header-image {
  width: 200px; /* Tamanho da imagem */
  height: 200px; /* Tamanho da imagem */
  border-radius: 50%; /* Tornando a imagem circular */
  object-fit: cover; /* Ajusta a imagem para preencher o círculo sem distorção */
  border: 3px solid #DDD; /* Borda opcional para o círculo */
}
@media (max-width: 768px) {
  .benefit-box {
      width: 45%;
      
  }
}

@media (max-width: 480px) {
  .benefit-box {
      width: 100%;
  }
}
.create_store {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f7f7f7;
  margin-bottom:2%
}
.form_store {
  display:flex;
  justify-content:center;
  flex-direction:column;
  text-align:center;
  width: 500px;
  padding: 40px;
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.1);
  height:100%;
}
.form{
  display:flex;
  flex-direction:column;
  margin:3%;
  align-items: center;
}
.message h3{
  color:red
}
 input,textarea,select,button{

  padding: 12px;
  border: 1px solid #ccc;
  border-radius: 5px;
  box-sizing: border-box;
  font-size: 16px;
  margin-top:2%;
}
button{
    cursor:pointer;
}
    
`
