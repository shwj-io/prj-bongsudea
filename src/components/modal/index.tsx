/* eslint-disable @next/next/no-img-element */
import { modal, text } from './style.css.ts';
import Link from 'next/link';
// css

type ModalProps = {
  arr: any;
};

export default function Modal({ arr }: ModalProps) {
  return (
    <div className={modal}>
      {arr.map((ele: any) => {
        return ele.type === 'link' ? (
          <Link
            key={ele.id}
            href={ele.link}
            onClick={ele.func ? ele.func : undefined}
            className={text}
          >
            {ele.text}
          </Link>
        ) : (
          <button
            key={ele.id}
            onClick={ele.func}
            type="button"
            className={text}
          >
            {ele.text}
          </button>
        );
      })}
    </div>
  );
}
