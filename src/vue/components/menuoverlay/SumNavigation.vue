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
  /* height: 25%; */
}
.naviTable tbody {
  display: inline-table;
  font-size: 0.5em;
  position: relative;
}

</style>