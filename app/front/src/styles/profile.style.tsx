import styled,{css} from "styled-components"


export const ListContainer = styled.div`
.text{
  display:flex;
  align-text:center;
 
  justify-content:center;
}
.list-container {
  display: flex;
  flex-direction: row;
  gap: 16px;
  padding: 20px;

  margin: 0 auto;
  flex-wrap:wrap;
  align-items: center;
  justify-content:center;
  width:85%;

   border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}


.text h1 {
  font-size: 1.8rem;
  font-weight: 600;
  color: #2c2c2c; 
  background-color: #f9f9f9; s
  padding: 12px 24px;
  border-radius: 8px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.04);
  display: inline-block;
}


.list-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.list-item {
  background-color: #f8f9fb;
  
  border-radius: 12px;
  padding: 16px 20px;
  display: flex;
  align-items: center;
  gap: 16px;
  width: 100%;
  max-width: 250px;
  max-height: 140px;
  
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  color: #0e1420;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.list-item:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.list-image {
  width: 60px;
  height: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid #ccc;
  border-radius: 10px;
  overflow: hidden;
  background-color: white;
  flex-shrink: 0;
}

.list-image img {
  width: 100%;
  height: 100%;
}

.list-info {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.list-info h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}

.list-info p {
  margin: 0;
  font-size: 14px;
  color: #333;
}
  
`
type ListItemsProps = {
  size?: "small" | "medium" | "big";
};

export const ListItems = styled.div<ListItemsProps>`
  background-color: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 20px;
  color: #1f2937;
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  display: flex;
  flex-direction: column;
  gap: 12px;
  justify-content: space-between;

 
  width: 280px;
  min-height: 140px;


  ${(props) =>
    props.size === "small" &&
    css`
      width: 180px;
      min-height: 100px;
      padding: 12px;
      font-size: 0.85rem;

      .list-info {
        h3 {
          font-size: 1rem;
        }
        p {
          font-size: 0.9rem;
        }
      }
    `}

  ${(props) =>
    props.size === "big" &&
    css`
      width: 400px;
      min-height: 200px;
      padding: 32px;
      font-size: 1.1rem;

      .list-info {
        h3 {
          font-size: 1.75rem;
        }
        p {
          font-size: 1.5rem;
        }
      }
    `}

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.08);
    border-color: #d1d5db;
  }
`


export const ListInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align:center;
  h3 {
    font-size: 1.25rem;
    color: #374151; 
    font-weight: 600;
  }

  p {
    font-size: 2.5rem;
    color: #059669; 
    font-weight: 700;
    margin: 0;
  }
`



export const ProfileStyle = styled.div`
text-align:center;
.boxes{
  justify-self:center;
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  justify-content: center;
  padding: 16px;
  margin: 32px 0;
  width:60%;
  border: 1px solid rgba(255, 255, 255, 0.15);
  border-radius: 16px;
  backdrop-filter: blur(8px);
  background: rgba(255, 255, 255, 0.05);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}


.box {
  background-color: #ffffff;
  border-radius: 12px;
  padding: 7px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  width: auto;
  height:auto;
  max-width:160px;
  margin:1%;
   border: 1px solid rgba(255, 255, 255, 0.15);
    border-radius: 16px;
    backdrop-filter: blur(8px);
    background: rgba(255, 255, 255, 0.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
}

.box:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 18px rgba(0, 0, 0, 0.12);
}

.box img {
  width: 120px;
  height: 120px;
  object-fit: contain;
  margin-bottom: 2px; 
}

.box p {
  font-size: 14px;
  color: #111; 
  font-weight: 600;
  text-align: center;
  margin: 2px 0 0 0; 
}
  
`