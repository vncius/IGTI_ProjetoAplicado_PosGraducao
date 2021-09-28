import { css } from "@emotion/react";
import ClipLoader from "react-spinners/ClipLoader";
import EfeitoFade from "./EfeitoFade";
import React from 'react'

export default function Spinner() {
  const override = css`
  display: block;
  margin: 0 auto;
  border-color: black;
`;

  return (
    <div className="SpinnerCustom" style={{ height: '100%' }}>
      <div className="SpinnerCustomContainer" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '20%', backgroundColor: 'rgba(219,230,229,0.5)', height: '100%' }}>
        <div className="sweet-loading">
          <ClipLoader color={"#ffffff"} loading={true} css={override} size={150} />
        </div>
        <h3>Carregando...</h3>
      </div>
    </div>
  );
}
