<template>
  <div>
    <table class="naviTable bg-secondary q-pl-sm q-pb-sm">
      <tbody>
        <tr>
          <th></th>
          <th>#</th>
          <th>SCO</th>
          <th>CPL</th>
        </tr>
        <tr>
          <td>CRS:</td>
          <td>15</td>
          <td>12%</td>
          <td>89%</td>
        </tr>
        <tr>
          <td>UNT:</td>
          <td>3</td>
          <td>45%</td>
          <td>67%</td>
        </tr>
        <tr>
          <td>LES:</td>
          <td>4</td>
          <td>35%</td>
          <td>85%</td>
        </tr>
        <tr>
          <td>MOD:</td>
          <td>3</td>
          <td>58%</td>
          <td>95%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style>
.naviTable {
  /* display: grid; */
  border-collapse: collapse;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
  grid-template-rows: repeat(auto-fit, minmax(10px, 0.7fr));
  margin-right: 5px;
  margin-top: 10px;
}
.naviTable tbody {
  display: inline-table;
  position: relative;
  height: 20vh;
}

/* smaller font size for smaller screens */
@media (max-width: 768px) {
  .naviTable {
    margin: 15px 0 0 10px;
  }
  .naviTable tbody {
    height: 15vh;
  }
  .naviTable th, .naviTable td {
    font-size: 0.7rem; 
  }
  .volumeMute {
    top: -20px;
    font-size: 0.8em;
  }
  .menuBtn {
    font-size: 2rem;
  }
  .explainIcon {
    top: 25px;
    font-size: 1rem;
    right: 90px;
  }
  .explainIcon:hover {
    transform: scale(1.5);
  }
}

/* larger font size for larger screens */
@media (min-width: 768px) {
  .naviTable {
    margin: 20px 10px 0 10px;
  }
  .naviTable th, .naviTable td {
    font-size: 1.1rem; 
  }
  .volumeMute {
    top: -30px;
    font-size: 1em;
  }
  .menuBtn {
    font-size: 3rem;
    margin: 0 15px 0 0;
  }
  .explainIcon {
    font-size: 1.2rem;
    right: 120px;
  }
}
</style>