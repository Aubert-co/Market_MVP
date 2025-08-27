import styled,{createGlobalStyle} from "styled-components";

const brandColor = "#ff6347"

export const GlobalStyles = createGlobalStyle`
  * {
    padding: 0;
    margin: 0;
    box-sizing: border-box;
  }
`;
export const ContainerStyle = styled.div`
display: grid;
grid-template-areas:
  "header header header header"
  "main main main main"
  "footer footer footer footer";
grid-template-columns: 10% 70% 5%;
grid-template-rows: auto 1fr auto; 
column-gap: 1%;
background-color: white;
min-height:97vh;
box-sizing: border-box; 

`



export const Main = styled.main`
  grid-area: main;


  margin-bottom:1%;
  margin-top:5%;
  .error{
    color:red;
    text-align:center;
  }
`;


export const ProductSection = styled.div`
text-align: center;
box-sizing: border-box;


.product-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  cursor:pointer;
  align-items:center;
  max-width:100%;
}

.product {
  margin: 10px;
  width: 300px;          /* largura desejada */
  min-width: 250px;      /* nunca vai encolher além disso */
  flex-shrink: 0;        /* impede que encolha */
  border: 1px solid #ccc;
  border-radius: 10px;
  text-align: start;
  background-color: #fff; 
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1); 
  transition: transform 0.3s, box-shadow 0.3s;
}

.product:hover {
  transform: translateY(-5px); 
  box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2); 
}

.product p {
  margin: 10px;
  color: #666;
  font-size: 0.95rem;
}

.product a:hover {
  background-color: #0056b3;
}

.img {
  background-color: #e0e0e0;
  width: 100%;
  height: 250px;
  border-radius: 10px 10px 0 0;
}
 
  `
export const Header = styled.header`
grid-area: header;
width: 95%;
display: flex;
justify-content: space-between;
align-items: center;
padding: 10px;
background-color: #2a2a2a; 
box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
border-radius: 8px;
justify-self: center;
margin-top: 1%;

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 10px;
  cursor: pointer;
}

.logo img {
  max-width: 50px;
  height: auto;
}

.logo a {
  text-decoration: none;
  font-weight: bold;
  font-size: 28px;
  color: ${brandColor}
}

nav {
  margin-top: 20px;
  margin-bottom: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  padding-right: 20px;
}

nav a {
  margin-left: 10%;
  color: #b0b0b0; 
  text-decoration: none;
  font-size: 16px;
  font-weight: bold;
  padding: 10px 15px;
  white-space: nowrap;
  text-transform: uppercase;
  transition: background-color 0.3s ease, color 0.3s ease;
  border-radius: 5px;
}

nav a:hover {
  background-color: #b0b0b0;
  color: #2a2a2a;
}

.search {
  display: flex;
  width: 50%;
  height: 70%;
  justify-content: center;
  align-items: center;

}
.search-items{
  display: flex;
  width: 100%;
  height: 100%;
  justify-content: center;
  align-items: center;
  background-color:white;
  
}
.search-items:focus-within {
  border-color: #ff6600; /* cor do foco */
  box-shadow: 0 0 5px rgba(255, 102, 0, 0.5); /* efeito glow opcional */
}
.input_search {
  width: 70%;
  height: 50%;
  padding:1%;
  text-align:center;
  border:none;
  font-size: 16px;
}
.input_search:focus{
outline:none
}
.btn_search {
  height: 100%;
  background-color: ${brandColor}; ;
  cursor: pointer;
  padding:1%;
  width: 30%;
  border: none;
  color: white;
  font-weight: bold;

  transition: background-color 0.3s ease;
}

.btn_search:hover {
  background-color: #df472b;
}
i{
 cursor: pointer;
  margin: 0 15px;
  font-size: 1.5em;
  color: #f5f5f5; 

  &:hover {
    color: ${brandColor};
    transition: color 0.3s ease-in-out;
  }

  &.cart-icon {
    position: relative;
  }

  &.profile-icon {
    position: relative;

 }

  
  &.active {
    color: #ffd700; 
  }
}
  @media (max-width: 580px) {
  display:grid;
  grid-template-areas:"logo nav"
  "search search";
  box-sizing: border-box;
  padding:8px;
  padding-bottom:14px;
  width:max-content;
 
  .logo{
    grid-area:logo;
  }
  nav{
    grid-area:nav;
  }
 .search {
  grid-area: search;
  width: 95%;
  margin-top: 10px;
  display: flex;
  justify-content: center;
  align-items: center; 
  height: 90%;           
  background-color:orange;
  }
 

}
 
`

;


