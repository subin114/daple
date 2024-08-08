const AvatarsSvg = () => {
  return (
    <svg
      viewBox="0 0 36 36"
      fill="none"
      role="img"
      xmlns="http://www.w3.org/2000/svg"
      width="80"
      height="80"
    >
      <mask id=":r1l:" maskUnits="userSpaceOnUse" x="0" y="0" width="36" height="36">
        <rect width="36" height="36" rx="72" fill="#FFFFFF"></rect>
      </mask>
      <g mask="url(#:r1l:)">
        <rect width="36" height="36" fill="#cee891"></rect>
        <rect
          x="0"
          y="0"
          width="36"
          height="36"
          transform="translate(-5 9) rotate(229 18 18) scale(1.1)"
          fill="#50c8c6"
          rx="36"
        ></rect>
        <g transform="translate(-5 4.5) rotate(9 18 18)">
          <path d="M13,20 a1,0.75 0 0,0 10,0" fill="#000000"></path>
          <rect x="10" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
          <rect x="24" y="14" width="1.5" height="2" rx="1" stroke="none" fill="#000000"></rect>
        </g>
      </g>
    </svg>
  );
};

export default AvatarsSvg;
