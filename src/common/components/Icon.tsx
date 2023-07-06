import React from "react";
const defaultColor = "currentColor";
const defaultSize = 24;

export const Search = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M10 5a5 5 0 100 10 5 5 0 000-10zm-7 5a7 7 0 1112.606 4.192l5.101 5.1a1 1 0 01-1.414 1.415l-5.1-5.1A7 7 0 013 10z"
          clipRule="evenodd"
        ></path>
      </svg>
    </i>
  );
};

export const Twitter = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 -2 20 20"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill={color} transform="translate(-60 -7521)">
            <g transform="translate(56 160)">
              <path d="M10.29 7377c7.547 0 11.675-6.156 11.675-11.495 0-.175 0-.349-.012-.522A8.265 8.265 0 0024 7362.89a8.273 8.273 0 01-2.356.637 4.07 4.07 0 001.804-2.235 8.303 8.303 0 01-2.606.98 4.153 4.153 0 00-5.806-.175 4.006 4.006 0 00-1.187 3.86 11.717 11.717 0 01-8.457-4.22 4.005 4.005 0 001.271 5.392 4.122 4.122 0 01-1.863-.505v.051c.001 1.923 1.378 3.579 3.292 3.96a4.144 4.144 0 01-1.852.069c.537 1.646 2.078 2.773 3.833 2.806A8.315 8.315 0 014 7375.185a11.754 11.754 0 006.29 1.812"></path>
            </g>
          </g>
        </g>
      </svg>
    </i>
  );
};

export const Facebook = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 32 32"
        fill={color}
      >
        <path d="M21.95 5.005l-3.306-.004c-3.206 0-5.277 2.124-5.277 5.415v2.495H10.05v4.515h3.317l-.004 9.575h4.641l.004-9.575h3.806l-.003-4.514h-3.803v-2.117c0-1.018.241-1.533 1.566-1.533l2.366-.001.01-4.256z"></path>
      </svg>
    </i>
  );
};

export const WhatsApp = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          fillRule="evenodd"
          d="M3.5 12a8.5 8.5 0 118.5 8.5 8.455 8.455 0 01-4.542-1.314 1 1 0 00-.821-.113l-2.88.859 1.085-2.537a1 1 0 00-.07-.92A8.456 8.456 0 013.5 12zM12 1.5C6.201 1.5 1.5 6.201 1.5 12c0 1.838.473 3.568 1.305 5.073L1.08 21.107a1 1 0 001.206 1.351l4.5-1.342A10.456 10.456 0 0012 22.5c5.799 0 10.5-4.701 10.5-10.5S17.799 1.5 12 1.5zm2.293 12.682l-1.315.926A9.338 9.338 0 0111 13.585a10.202 10.202 0 01-1.624-2.114l.835-.709a1 1 0 00.236-1.232l-1.064-2a1 1 0 00-1.54-.283l-.316.275c-.759.662-1.208 1.75-.836 2.852A12.049 12.049 0 009.586 15c1.813 1.813 3.655 2.527 4.733 2.805.868.223 1.689-.076 2.268-.548l.591-.482a1 1 0 00-.12-1.634l-1.678-1a1 1 0 00-1.088.041z"
          clipRule="evenodd"
        ></path>
      </svg>
    </i>
  );
};

export const LinkedIn = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 20 20"
      >
        <g fill="none" fillRule="evenodd" stroke="none" strokeWidth="1">
          <g fill={color} transform="translate(-180 -7479)">
            <g transform="translate(56 160)">
              <path d="M144 7339h-4v-6.999c0-1.92-.847-2.991-2.366-2.991-1.653 0-2.634 1.116-2.634 2.991V7339h-4v-13h4v1.462s1.255-2.202 4.083-2.202c2.829 0 4.917 1.726 4.917 5.298V7339zm-17.558-15.079a2.451 2.451 0 01-2.442-2.461 2.451 2.451 0 012.442-2.46 2.451 2.451 0 012.441 2.46 2.45 2.45 0 01-2.441 2.461zM124 7339h5v-13h-5v13z"></path>
            </g>
          </g>
        </g>
      </svg>
    </i>
  );
};

export const Wifi = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        fill="none"
        viewBox="0 0 24 24"
      >
        <g>
          <path
            stroke={color}
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M8.343 14.59a5 5 0 017.29-.025m-9.484-3.021a8 8 0 0111.664-.04M3.223 8.816a12 12 0 0117.497-.06M12 19a1 1 0 110-2 1 1 0 010 2z"
          ></path>
        </g>
      </svg>
    </i>
  );
};

export const LeftAngle = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="-12 0 32 32"
      >
        <path
          fill={color}
          d="M7.28 23.28c-.2 0-.44-.08-.6-.24L.24 16.6c-.32-.32-.32-.84 0-1.2l6.44-6.44c.32-.32.84-.32 1.2 0 .32.32.32.84 0 1.2L2.08 16l5.84 5.84c.32.32.32.84 0 1.2-.16.16-.44.24-.64.24z"
        ></path>
      </svg>
    </i>
  );
};

export const RightAngle = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="-12 0 32 32"
      >
        <path
          fill={color}
          d="M.88 23.28c-.2 0-.44-.08-.6-.24-.32-.32-.32-.84 0-1.2L6.04 16l-5.8-5.84c-.32-.32-.32-.84 0-1.2.32-.32.84-.32 1.2 0l6.44 6.44c.16.16.24.36.24.6s-.08.44-.24.6l-6.4 6.44c-.2.16-.4.24-.6.24z"
        ></path>
      </svg>
    </i>
  );
};

export const DownAngle = ({ size = defaultSize, color = defaultColor }) => {
  return (
    <i
      className="icon"
      style={{
        height: size,
        width: size,
      }}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width={size}
        height={size}
        viewBox="0 0 24 24"
      >
        <path
          fill={color}
          d="M17 9.17a1 1 0 00-1.41 0L12 12.71 8.46 9.17a1 1 0 00-1.41 0 1 1 0 000 1.42l4.24 4.24a1 1 0 001.42 0L17 10.59a1 1 0 000-1.42z"
        ></path>
      </svg>
    </i>
  );
};
