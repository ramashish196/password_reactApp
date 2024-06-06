import { useState, useCallback, useEffect, useRef } from "react";

const Hero = () => {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState("false");
  const [allowedchar, setAllowedchar] = useState("false");
  const [password, setPassword] = useState("");
  const passwordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (number) {
      str += "0123456789";
    }
    if (allowedchar) {
      str += "!@#$&*";
    }
    for (let i = 1; i <= length; i++) {
      let creatPass = Math.floor(Math.random() * str.length + 1);
      pass += str.charAt(creatPass);
    }
    setPassword(pass);
  }, [length, number, allowedchar, setPassword]);
  useEffect(() => {
    passwordGenerator();
  }, [length, number, allowedchar, setPassword]);
  const passwordref = useRef(null);
  const copyPassword = useCallback(() => {
    passwordref.current?.select();
    window.navigator.clipboard.writeText(password);
  }, [password]);
  return (
    <>
      <div className="w-1/2 bg-slate-800 h-36 rounded-md  mx-auto border-2 my-8 text-center">
        <h1 className="text-orange-500 font-bold pt-2">Password Generator</h1>
        <div className=" flex gap-3 outline-none  w-[70%] mt-5 ml-16 h-10  bg-slate-90 border-2 border-amber-400 rounded-lg  text-white">
          <input
            type="text"
            placeholder="password"
            value={password}
            ref={passwordref}
            className="w-[100%] h-[100%] rounded-lg text-black"
            readOnly
          />
          <button
            className=" bg-blue-400 outline-none px-2 shrink-0 rounded-lg hover:bg-blue-600"
            onClick={copyPassword}
          >
            copy
          </button>
        </div>
        <div className="flex gap-x-6 justify-center mt-3">
          <div className="flex items-center gap-x-3 text-black">
            <input
              type="range"
              name=""
              id=""
              min={8}
              max={100}
              value={length}
              className="cursor-pointer"
              onChange={(e) => {
                setLength(e.target.value);
              }}
            />
            <label className="text-white ">Length: {length}</label>
          </div>
          <div className="flex gap-x-2 text-white">
            <input
              type="checkbox"
              name=""
              id=""
              defaultChecked={number}
              onChange={(e) => {
                setNumber((preValue) => !preValue);
              }}
            />
            <label htmlFor="" className="text-white">
              Numbers
            </label>
          </div>
          <div className="flex gap-x-2 text-white">
            <input
              type="checkbox"
              name=""
              defaultChecked={allowedchar}
              id=""
              onChange={(e) => {
                setAllowedchar((preValue) => !preValue);
              }}
            />
            <label htmlFor="" className="text-white">
              Characters
            </label>
          </div>
        </div>
      </div>
    </>
  );
};

export default Hero;
