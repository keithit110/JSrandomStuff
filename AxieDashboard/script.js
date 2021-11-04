'use strict';

// const ethAddress = [
//   '0xa5Df31bB4cDD4c94E789C6D7ac302662EE7934B9',
//   '0x6feEdC707253d219ce844623a7CAF1fe741e99E1',
//   '0x971BfB7c317b89332f9AD9c231dDd7f6E7BFd161',
//   '0xa48F22dBe09375504441Fde5830c9702A31e23B3',
//   '0xe294DC4DB76aa5B1D5E28D69E327E2a8f0F36bbb',
// ];
const ethAddress = [];
const arrRoninAdd = [];
const arrSchoName = [];
const arrManagerPercent = [];
// const apiURL = 'https://api.lunaciarover.com/stats/';
let jsonData = [];
let temp = '';
const managerShare = 70 / 100;
//modals
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.close-modal');
const btnsOpenModal = document.querySelector('.acc-button');

//input fields
let schoName = '';
let roninAdd = '';
let managerPercent = '';

function saveAccountData() {
  schoName = document.getElementById('alias').value;
  roninAdd = document.getElementById('walletAddress').value;
  managerPercent = document.getElementById('managerPercent').value;
  // console.log(schoName,roninAdd,managerPercet);
  ethAddress.push(roninAdd.replace('ronin:', '0x'));
  runMainScript();
  // storeWalletInfoToSQL();
  closeModal();
  //   console.log(roninAdd.replace('ronin:','0x'));
}

// //sql connections
// var sql = require('mssql');
// //2.
// const config = {
//   server: 'localhost',
//   database: 'Axie',
//   user: 'axiequery',
//   password: 'Changeme@123',
//   port: 1433,
// };

// //connections to sql
// function storeWalletInfoToSQL() {
//   //4.
//   var dbConn = new sql.Connection(config);
//   //5.
//   dbConn
//     .connect()
//     .then(function () {
//       //6.
//       var request = new sql.Request(dbConn);
//       //7.
//       request
//         .query(
//           "insert into dbo.SLPDetails(RoninWallet) values ('" + roninAdd + "'"
//         )
//         .then(function (recordSet) {
//           console.log(recordSet);
//           dbConn.close();
//         })
//         .catch(function (err) {
//           //8.
//           console.log(err);
//           dbConn.close();
//         });
//     })
//     .catch(function (err) {
//       //9.
//       console.log(err);
//     });
// }

const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
  return;
};

//close add account modal
btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  // console.log(e.key);

  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
}); //end close add account modal

btnsOpenModal.addEventListener('click', openModal);

function runMainScript() {
  //   for (let i = 0; i < ethAddress.length; i++) {

  //multiple fetch
  //   Promise.all([
  //     fetch(`https://axie-proxy.secret-shop.buzz/_schoEarnings/${roninAdd.replace('ronin:','0x')}`),
  //     fetch(`https://axie-proxy.secret-shop.buzz/_basicStats/${roninAdd.replace('ronin:','0x')}`),
  //   ])
  //     .then(function (responses) {
  //       // Get a JSON object from each of the responses
  //       return Promise.all(
  //         responses.map(function (response) {
  //           return response.json();
  //         })
  //       );
  //     })
  //     .then(function (data) {
  //       // Log the data to the console
  //       // You would do something with both sets of data here
  //       console.log(data);
  //       jsonData.push(data);

  //       temp += '<tr>';
  //       temp += '<td><a href="https://marketplace.axieinfinity.com/profile/'+roninAdd+'" target="_blank">' + data[1].stats.name + '</a></td>';
  //       temp += '<td>' + data[1].stats.elo + '</td>';
  //       temp += '<td>' + data[1].stats.rank + '</td>';
  //       temp += '<td>' + data[0].earnings.slp_inventory + '</td></tr>';
  //       // console.log(temp);
  //       document.getElementById('data').innerHTML = temp;
  //     }); //end multiple fetch

  //single fetch
  fetch(
    `https://api.lunaciarover.com/stats/${roninAdd.replace('ronin:', '0x')}`
  ).then((res) => {
    res.json().then((data) => {
      console.log(data);
      jsonData.push(data);
      // console.log(data);

      temp += '<tr>';
      temp +=
        '<td><a href="https://marketplace.axieinfinity.com/profile/' +
        roninAdd +
        '" target="_blank">' +
        schoName +
        '</td>';
      temp += '<td>' + data.mmr + '</td>';
      temp += '<td>' + data.rank + '</td>';
      temp += '<td>' + data.in_game_slp + '</td>';
      temp += '<td>145</td></tr>';

      // console.log(temp);
      document.getElementById('data').innerHTML = temp;
    });
  }); //end signle fetch
  //}  //end for loop
  return;
} //end runMainScript func

// console.log(ethAddress);
// console.log(jsonData);
