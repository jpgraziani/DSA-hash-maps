class ChainingHashMap {
  constructor(capacity = 8){
    this.length = 0;
    this._hashTable = [];
    this._capacity = capacity;
  }

  get(key){
    const hash = ChainingHashMap._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined){
      throw new Error("Key Error");
    }

    for (let i = 0; i < slot.length; i++){
      if (slot[i].key === key){
        return slot[i].value;
      }
    }
  }
  set(key, value){
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;
    if (loadRatio > ChainingHashMap.MAX_LOAD_RATIO){
      this._resize(this._capacity * ChainingHashMap.SIZE_RATIO);
    }

    const hash = ChainingHashMap._hashString(key);
    const index = hash % this._capacity;

    if (!this._hashTable[index]){
      this._hashTable[index] = [];
    }

    for (let i = 0; i < this._hashTable[index].length; i++){
      if (this._hashTable[index][i].key === key){
        return (this._hashTable[index][i].value = value);
      }
    }

    this.length++;
    this._hashTable[index].push({
      key,
      value
    });
  }
  delete(key){
    const hash = ChainingHashMap._hashString(key);
    const index = hash % this._capacity;
    const slot = this._hashTable[index];

    if (slot === undefined){
      throw new Error("Key Error");
    }

    for (let i = 0; i < slot.length; i++){
      if (slot[i].key === key){
        this.length--;
        this._hashTable[index].splice(i, 1);
        break;
      }
    }
  }

  _resize(size){
    const oldSlots = this._hashTable;
    this._capacity = size;
    // Reset the length - it will get rebuilt as you add the items back
    this.length = 0;
    this._hashTable = [];

    for (const slot of oldSlots){
      if (slot !== undefined){
        slot.forEach(obj => this.set(obj.key, obj.value));
      }
    }
  }

  static _hashString(string){
    let hash = 5381;
    for (let i = 0; i < string.length; i++){
      // Bitwise left shift with 5 0s - this would be similar to
      // hash*31, 31 being the decent prime number
      // but bit shifting is a faster way to do this
      // tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      // converting hash to a 32 bit integer
      hash = hash & hash;
    }
    // making sure hash is unsigned - meaning non-negative number
    return hash >>> 0;
  }
}

module.exports = ChainingHashMap;