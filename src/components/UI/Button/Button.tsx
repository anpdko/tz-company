import React from 'react'
import s from './Button.module.scss'


interface ClickableButtonProps {
   children: React.ReactNode;
   className?: string;
   onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

interface SubmitButtonProps extends ClickableButtonProps {
   type: "submit";
}

const Button = ({ children, className, onClick, ...props }: ClickableButtonProps | SubmitButtonProps) => {
   return (
      <button {...props}
         onClick={onClick}
         className={[s.btn, s.btn_fill, className].join(" ")}>
         {children}
      </button>
   );
};
export default Button