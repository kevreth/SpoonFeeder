<template>
  <div>
    <table class="naviTable bg-secondary q-pl-sm q-pb-sm">
      <tbody>
        <tr>
          <th></th>
          <th>#</th>
          <th>{{ $t('sumNavi.sco') }}</th>
          <th>{{ $t('sumNavi.cpl') }}</th>
        </tr>
        <tr>
          <td>{{ $t('sumNavi.crs') }}</td>
          <td>15</td>
          <td>12%</td>
          <td>89%</td>
        </tr>
        <tr>
          <td>{{ $t('sumNavi.unt') }}</td>
          <td>3</td>
          <td>45%</td>
          <td>67%</td>
        </tr>
        <tr>
          <td>{{ $t('sumNavi.les') }}</td>
          <td>4</td>
          <td>35%</td>
          <td>85%</td>
        </tr>
        <tr>
          <td>{{ $t('sumNavi.mod') }}</td>
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
  /* display:inline-block; */
  border-collapse: collapse;
  border-radius: 20px;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.5), 0 4px 8px rgba(0, 0, 0, 0.15);
  /* grid-template-rows: repeat(auto-fit, minmax(10px, 0.7fr)); */
  margin: 15px 15px 0 15px;
  float: left;
}
.naviTable tbody {
  display: inline-table;
  position: relative;
  font-size: 1.5vw
}
@media screen and (min-width: 1200px) {
  .naviTable tbody {
    font-size: 0.9vw;
  }
}
</style>