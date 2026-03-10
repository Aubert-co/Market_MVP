import styled from "styled-components";

export const StoreDashboard = styled.div<{ $open: boolean }>`
  min-height: 97vh;
  background-color: white;
  box-sizing: border-box;
  display: grid;
  grid-template-areas: "main";
  transition: all 0.3s ease;
  background-color:rgb(248 250 252);
  main {
    display: flex;
    flex-direction:column;
    grid-area: main;
    transition: margin-left 0.3s ease;
    margin-left: ${({ $open }) => ($open ? "240px" : "0")};
    padding: 20px;
    align-items:center;
  }
   header {
    width: 100%;
    padding: 20px 24px;
    margin-bottom: 24px;

    background: linear-gradient(
      135deg,
      #f8fafc,
      #eef2ff
    );
    
    border-radius: 16px;

    display: flex;
    flex-direction: column;
    gap: 6px;

    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.06);
  }
header h1 {
  font-size: 1.6rem;
  font-weight: 600;
  color: #0f172a;
}

header p {
  font-size: 0.9rem;
  color: #64748b;
}
.drawer {
  position: fixed;
  top: 0;
  right: 0;

  width: 420px;
  height: 100vh;

  background: #ffffff;

  box-shadow: -8px 0 24px rgba(0, 0, 0, 0.12);

  z-index: 1000;

  display: flex;
  flex-direction: column;
  padding: 20px;
}


`;

export const SiderStyle = styled.aside<{ $open: boolean }>`
  position: fixed;
  top: 0;
  left: 0;
  transform: ${({ $open }) => ($open ? "translateX(0)" : "translateX(-100%)")};
  width: 240px;
  height: 100vh;
  background-color: #1e293b;
  color: #f9fafb;
  display: flex;
  flex-direction: column;
  border-right: 1px solid #334155;
  border-radius: 0 16px 16px 0;
  padding: 16px 0;
  box-shadow: 2px 0 12px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  z-index: 1000;
  
  .items-sidebar{
    display:flex;
    flex-direction:column;
    justify-content:space-between;
    height:80%;
  }
 .store-logo {
  display: flex;
  justify-content: center;
  align-items: center;

  margin-bottom: 24px;

  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: 0.5px;

  color: #6298f0ff;
  text-align: center;
}


  .menu {
    list-style: none;
    padding: 0;
    margin: 0;
    flex: 1;
  }

  .menu-item {
    display: flex;
    align-items: center;
    padding: 12px 18px;
    margin: 6px 12px;
    border-radius: 12px;
    cursor: pointer;
    transition: background-color 0.2s ease, transform 0.2s ease;

    &:hover {
      background-color: #334155;
      transform: translateX(4px);
    }
  }

  .active {
    background-color: #3b82f6;
  }

  .icon-wraper {
    margin-right: 12px;
    display: flex;
    align-items: center;
    color: #94a3b8;
  }

  .item-label {
    font-size: 0.95rem;
    font-weight: 500;
    color: #f1f5f9;
  }
  
`;


export const Box = styled.div`
  display:flex;
  background: linear-gradient(
    180deg,
    #ffffff 0%,
    #f8fafc 100%
  );

  border-radius: 18px;
  padding: 20px;

  margin: 24px 0;

  border: 1px solid rgba(15, 23, 42, 0.06);

  box-shadow:
    0 1px 2px rgba(0, 0, 0, 0.04),
    0 8px 24px rgba(0, 0, 0, 0.06);

  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease,
    border-color 0.2s ease;

  &:hover {
    transform: translateY(-4px);
    box-shadow:
      0 4px 12px rgba(0, 0, 0, 0.08),
      0 16px 32px rgba(0, 0, 0, 0.08);
    border-color: rgba(37, 99, 235, 0.25);
  }
`;



export const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 20px;
  width: 100%;

  flex-wrap: wrap;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    justify-content:center;
    .search-items{
      display:flex;
      flex-direction:column
      width:50%;
    }
  }
  input {
    flex: 1;
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    outline: none;
    font-size: 0.95rem;
    transition: all 0.2s ease;
    background: #f9fafb;

    &:focus {
      border-color: #3b82f6;
      background: #fff;
      box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.2);
    }
  }

  button {
    padding: 10px 18px;
    border: none;
    border-radius: 10px;
    background: #3b82f6;
    color: #fff;
    font-size: 0.95rem;
    font-weight: 500;
    cursor: pointer;
    transition: background 0.2s ease, transform 0.2s ease;

    &:hover {
      background: #2563eb;
      transform: translateY(-1px);
    }

    &:active {
      background: #1d4ed8;
      transform: translateY(0);
    }
    
  }
.btn-expired {
  background: #ef4444;
  color: #fff;
}
.btn-valid {
  background: #22c55e;
  color: #fff;
}
.btn-all {
  background: #3b82f6;
  color: #fff;
}

  select {
    padding: 10px 14px;
    border: 1px solid #e2e8f0;
    border-radius: 10px;
    font-size: 0.95rem;
    background: #fff;
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      border-color: #cbd5e1;
    }
  }
  
`;


