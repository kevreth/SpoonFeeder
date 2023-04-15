<template>
  <div id="summary" class="sumNavigation q-mt-xs q-ml-sm">
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
.sumNavigation {
  position: fixed;
  left: 0px;
  width: 200px;
  max-width: 35%;
  overflow: auto;
}
.naviTable {
  display: grid;
  border-collapse: collapse;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
}
.naviTable tbody {
  display: inline-table;
  font-size: 0.8em;
  position: relative;
}

</style>