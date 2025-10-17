import styled from "styled-components";

type BtnProps = {
  $bg?: string;
  $hoverBg?: string;
  $color?: string;
};

export const StyleBtn = styled.button<BtnProps>`
  margin-top: 1rem;
  padding: 0.8rem 1.5rem;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  background: ${({ $bg }) => $bg || '#007BFF'};
  color: ${({ $color }) => $color || 'white'};
  transition: background 0.3s;
  &:hover {
    background: ${({ $hoverBg }) => $hoverBg || '#0056b3'};
  }
`;
export const SmallButton = styled.button`
   display: inline-block;
  padding: 0.4rem 1rem;
  font-size: 0.875rem; 
  font-weight: 500;
  color: #ffffff;
  background-color: #0070f3;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: background-color 0.2s ease, transform 0.1s ease;

  &:hover {
    background-color: #005bb5;
    transform: translateY(-1px);
  }

  &:active {
    background-color: #004494;
    transform: translateY(0);
  }
`
export const UserFormStyles = styled.div`

display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
min-height: 97vh;
background-color: #F7F7F7; 

form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 1rem;
  padding: 2rem;
  background: #FFFFFF; 
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1); 
  margin:1%;
}

.type_form {
  font-size: 1.5rem;
  color: #333333; 
  margin-bottom: 1rem;
}


.type_form {
  font-size: 1.5rem;         
  font-weight: 700;         
  color: #0e1420;            
  font-family: "Helvetica Neue", Helvetica, Arial, sans-serif;
  margin-bottom: 1rem;      
  line-height: 1.2;
  letter-spacing: 0.5px;     
}
.input-with-label {
  display: flex;
  flex-direction: column;
  gap: 6px;
  margin-bottom: 1%;
  align-items: center;
  text-align:center
}

.input-with-label label {
  font-weight: 500;
  color: #0e1420;
  font-size: 0.95rem;
}

input,
textarea,
select {
  padding: 0.6rem 0.8rem;
  font-size: 0.95rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  transition: border 0.2s ease;
  outline: none;
}

 input:focus,
 textarea:focus,
 select:focus {
  border-color: #0e1420;
}
input[type=file] {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
  max-width: 200px;
}

/* Estilizar o botão do seletor de arquivo */
input[type=file]::file-selector-button {
  padding: 0.4rem 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

input[type=file]::file-selector-button:hover {
  background-color: #0056b3;
}
input[type=file] {
  padding: 0.5rem 1rem;
  font-size: 0.9rem;
  border: 1px solid #ccc;
  border-radius: 6px;
  background-color: #f9f9f9;
  cursor: pointer;
  max-width: 70%;
  
}

input[type=file]::file-selector-button {
  padding: 0.4rem 0.8rem;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.3s ease;
}

input[type=file]::file-selector-button:hover {
  background-color: #0056b3;
}

`

