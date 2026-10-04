<div align="center">

  <img src="https://github.com/tapframe/NuvioTV/raw/dev/assets/brand/app_logo_wordmark.png" alt="NuvioTV TizenBrew" width="300" />
  <br />
  <br />

  <p>
    Public <b>TizenBrew wrapper</b> for Nuvio TV.
    <br />
    Lightweight TV launcher • Hosted app wrapper • Install directly in TizenBrew
  </p>

  <p>
    ⚠️ <b>Status: BETA</b> — experimental and may be unstable.
  </p>

</div>

## About

**NuvioTV TizenBrew** is a lightweight wrapper that opens the hosted Nuvio TV web app inside **TizenBrew**.

It is not the main application source code. This repository only contains the small Samsung TV wrapper used to launch the hosted experience.

## Install

No aplicativo **TizenBrew** na sua TV Samsung:
1. Vá na aba **Modules** (ou **Add Module**)
2. Selecione **GitHub** (ou digite o repositório):
```text
LeoBorba12/NuvioTVTizenBrew
```
3. Pressione Instalar/Confirmar.
4. Abra o **Nuvio TV** pela lista de módulos do TizenBrew!

A aplicação conectará automaticamente à versão mais recente v1.2.2 hospedada em:
`https://addon-catalogo-betor.vercel.app/tv/`

## For Developers

- Main shared app source: `NuvioMedia/NuvioWeb`
- This wrapper repo stays intentionally small and only handles the TizenBrew launch experience
- If you want to inspect or modify the wrapper locally, update `app/index.html`, `app/main.js`, and `package.json`
