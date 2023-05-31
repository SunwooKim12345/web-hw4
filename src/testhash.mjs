import hashutil from "./hashutil.mjs";

let testemail1 = "joecool@somwhere.org"
let testemail2 = "maryjane@somwhere.also.org"

let pw1 = "abc123"
let pw2 = "abc123"

let th1 = hashutil(testemail1, pw1);
let th2 = hashutil(testemail2, pw2);
console.log("hash1=|" + th1 + "|\n");
console.log("hash2=|" + th2 + "|\n");
