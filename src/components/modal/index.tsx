/* eslint-disable @next/next/no-img-element */
import { modal } from './style.css.ts';
// css

type ModalProps = {
  arr: any;
  onClick: any;
};

export default function Modal({ arr, onClick }: ModalProps) {
  return (
    <div className={modal}>
      {arr.map((ele: any) => {
        return (
          <div key={ele.id} onClick={onClick}>
            {ele.text}
          </div>
        );
      })}
    </div>
  );
}
