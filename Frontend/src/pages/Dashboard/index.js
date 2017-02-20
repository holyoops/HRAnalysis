import React from 'react';
import UserTrend from 'components/UserTrend';
import {ajax} from '../../ajax.js';

ajax({
  url: 'http://localhost:3301/api/todo_list',
  method: 'POST',
  async: true,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  data: JSON.stringify({test:'whaaaaaat aaaa fuuuuuuck!'}),
  onprogress: function (evt) {
    // console.log(evt.position/evt.total);
  }
})
.then(function (xhr) { console.log(xhr.response); },
function (e) { console.log(JSON.stringify(e)) })

// fetch("http://localhost:3301/api/todo_list", {
//   method: "POST",
//   headers: {
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   },
//   body: {test: 1, b: 2}
// }).then(response => response.json())
// .then(data => console.log(data))
// .catch(e => console.log("Oops, error", e));
//
// try {
//   let response = await fetch("http://localhost:3301/api/todo_list", {
//     method: "POST",
//     headers: {
//       'Accept': 'application/json',
//       'Content-Type': 'application/json'
//     },
//     body: JSON.stringify({a: 1, b: 2})
//     // headers: {
//     //   'Content-Type': 'application/json'
//     // }
//     // headers: {
//     //   "Content-Type": "application/x-www-form-urlencoded"
//     // },
//     // body: "firstName=Nikhil&favColor=blue&password=easytoguess"
//   });
//   let data = await response.json();
//   console.log(data);
// } catch(e) {
//   console.log("Oops, error", e);
// }

export default () => (
  //<UserTrend />
  <div />
);
