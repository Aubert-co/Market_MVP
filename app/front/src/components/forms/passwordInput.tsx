import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";

type Props = {
  placeholder: string;
  refPassword: React.RefObject<HTMLInputElement | null>;
  id:string,
};

export const PasswordInput = ({ placeholder, refPassword ,id }: Props) => {
  const [show, setShow] = useState(false);

  return (
    <div style={{ position: "relative" }}>
      <input 
        id={id}
        type={show ? "text" : "password"}
        ref={refPassword}
        placeholder={placeholder}
        
        minLength={3}
        className="input-form"
        maxLength={15}
      />
      <span
        data-testid="eye"
        onClick={() => setShow((prev) => !prev)}
        style={{
          position: "absolute",
          right: 10,
          top: "55%",
          transform: "translateY(-50%)",
          cursor: "pointer"
        }}
      >
        {show ? <FiEyeOff data-testid="eyeoff" size={20} /> : <FiEye data-testid="eyeon" size={20} />}
      </span>
    </div>
  );
};