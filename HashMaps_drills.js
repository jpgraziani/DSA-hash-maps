const HashMap = require('./hash-maps');
const ChainMap = require('./SeparateChainingHashMap')

function main() {
  const lotr = new HashMap();
  HashMap.MAX_LOAD_RATIO = 0.5;
  HashMap.SIZE_RATIO = 3;

  // lotr.set("Hobbit", "Bilbo");
  // lotr.set("Hobbit", "Frodo");
  // lotr.set("Wizard", "Ganbdolf");
  // lotr.set("Human", "Aragon");
  // lotr.set("Elf", "Legolas");
  // lotr.set("Maiar", "The Necromancer");
  // lotr.set("Maiar", "Sauron");
  // lotr.set("RingBearer", "Gollum");
  // lotr.set("LadyOfLight", "Galadriel");
  // lotr.set("HalfElven", "Arwen");
  // lotr.set("Ent", "Treebeard");

    // 1e) add the following items to your hash map
    let addItems = [
      ["Hobbit", "Bilbo"],
      ["Hobbit", "Frodo"],
      ["Wizard", "Gandalf"],
      ["Human", "Aragorn"],
      ["Elf", "Legolas"],
      ["Maiar", "The Necromancer"],
      ["Maiar", "Sauron"],
      ["RingBearer", "Gollum"],
      ["LadyOfLight", "Galadriel"],
      ["HalfElven", "Arwen"],
      ["Ent", "Treebeard"]
    ];
  
    addItems.forEach(item => {
      lotr.set(item[0],item[1]);
    })

    // 11 items provided - HashMap length: 9
    // Undefined item:
    //  - {"Ent": "Treebeard"}
    // Items missing:
    //  - {"Hobbit": "Bilbo"}
    //  - {"Maiar": "The Necromancer"}
  

  console.log(lotr.length); //9
  console.log(lotr._capacity); //24
  console.log(lotr); //some are missing
  console.log(lotr.get('Maiar'));
  console.log(lotr.get('Hobbit'));


  //===================================================================
  // 7 Seperate Chaining
  //===================================================================

  console.log(`---- CHAIN HASH MAP TESTS ----`);
  const lotr2 = new ChainMap();
  
  const chainData = [
    { Hobbit: "Bilbo" },
    { Hobbit: "Frodo" },
    { Wizard: "Gandolf" },
    { Human: "Aragon" },
    { Elf: "Legolas" },
    { Maiar: "The Necromancer" },
    { Maiar: "Sauron" },
    { RingBearer: "Gollum" },
    { LadyOfLight: "Galadriel" },
    { HalfElven: "Arwen" },
    { Ent: "Treebeard" }
  ];
  chainData.forEach(obj => {
    const key = Object.keys(obj)[0];
    lotr2.set(key,obj[key]);
  })
  
  console.log(lotr2);

  lotr2.get("Maiar");
  lotr2.get("Hobbit");

  console.log(lotr2.get("Maiar")); 
  console.log(lotr2.get("Hobbit"));
};


// What is capacity of your hash table? explain:
// The capacity is at 24 because we have initial capacity of 8 and hashmap resized by multiplying that
// initial capacity by SIZE_RATIO of 3. So, I get 24 total.

// ====  ALSO  =====

  // What is capacity of your hash table? explain:
  // Capacity after hashing all items: 8
  // Despite containing 9 items, the capacity is limited to 8,
  // which is probably why {"Ent": "Treebeard"} is labelled
  // undefined, even though it is technically included. Perhaps
  // setting values doesn't effectively alter the capacity.

main();

// #2
const WhatDoesThisDo = function(){
  let str1 = 'Hello World.'; // set str1 to 'Hello World'
  let str2 = 'Hello World.'; // set str2 to 'Hello World'
  let map1 = new HashMap(); // create new map1 hashmap
  map1.set(str1,10); // set key, value pair ('Hello World', 10)
  map1.set(str2,20); // set key, value pair ('Hello World', 20)
  let map2 = new HashMap(); // create another hashmap
  let str3 = str1; // set str3 to 'Hello World'
  let str4 = str2; // set str4 to 'Hello World'
  map2.set(str3,20); // set map2 value of 'Hello World'(str3) to 20
  map2.set(str4,10); // set map2 value of 'Hello World'(str4) to 10

  //console.log(map1.get(str1)); // 20
  //console.log(map2.get(str3)); // 10
};

WhatDoesThisDo();

// I think this function will get: 
// map1 = 20 because value was overwritten by map2.set(str3, 20)
// map2 = 10 because value was overwritten by map2.set(str4, 10)



//===================================================================
// 3 Demonstrate understanding of HashMaps
//===================================================================



// #3-1 Show your hash map after the insertion of keys 10, 22, 31, 4, 15, 28, 17, 88, 59 into a hash map of length 11 using open addressing and 
// a hash function k mod m, where k is the key and m is the length.
// -> [22, 31, 4, 15, 28, 17, 88, 59, 10]

// #3-2 Show your hash map after the insertion of the keys 5, 28, 19, 15, 20, 33, 12, 17, 10 into the hash map with collisions resolved by separate chaining. 
// Let the hash table have a length m = 9, and let the hash function be k mod m.
// -> [null, 28, 19, 10, 20, 12, null, 5, 15, 33, 17, null]     (not sure??)



//===================================================================
// 4 Remove Duplicates
//===================================================================

function removeDup(str) {
  const map = new Map();
  let newStr = '';

  for (let i=0; i<str.length; i++) {
    if (!map.has(str[i])) {
      console.log(map);
      newStr += str[i];
      map.set(str[i])
    }
    console.log(map)
  }
  return newStr;
}

console.log(removeDup('google'))



//===================================================================
// 5 Any permutation a palindrome
//===================================================================

function palindrome(str) {
  const map = new Map();
  let odd = 0;

  for(let i=0; i<str.length; i++) {
    console.log(map);
    if(map.get(str[i]) === undefined) {
      map.set(str[i], 1);
      console.log(map);
    }
    else {
      let char = map.get(str[i]);
      map.set(str[i], char+=1);
      console.log(map);
    }
  };

  console.log(map);
  for(let i=0; i<map.size; i++) {
    if(map.get(str[i]) % 2 !== 0) {
      odd++;
      console.log(map);
    }

    if(odd > 1) {
      return false;
    }
  };
  return true;
};

console.log(palindrome('acecarr')); // true
console.log(palindrome('north')); // false
console.log(palindrome('dad')); // true
console.log(palindrome('tree')); // false


//===================================================================
// 6 Anagram grouping
//===================================================================

function anagrams(arr) {
  let map = new HashMap();

  for (let idx in arr) {
    let sorted = arr[idx].split('').sort().join('');
    let anagrams;
    try{
      anagrams = map.get(sorted)
    } catch(e) {
      anagrams = [];
    }
    anagrams.push(arr[idx]);
    map.set(sorted, anagrams);
  }
  console.log(map._hashTable);

  let results = [];
  for (let i in map._hashTable) {
    results.push(map._hashTable[i].value);
  }
  return results;
}

console.log(anagrams(['east', 'cars', 'acre', 'arcs', 'teas', 'eats', 'race']));

