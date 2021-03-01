class HashMap {
  constructor(initialCapacity=8) {
    this.length = 0;
    this._hashTable = [];
    this._capacity = initialCapacity;
    this._deleted = 0;
  }

  /* ---------------------------------- */
  /* get / set / delete */
  /* ---------------------------------- */

  get(key) {
    const index = this._findSlot(key);

    if (this._hashTable[index] === undefined) {
      throw new Error('Key error');
    }
    return this._hashTable[index].value;
  };

  set(key, value) {
    const loadRatio = (this.length + this._deleted + 1) / this._capacity;

    if (loadRatio > HashMap.MAX_LOAD_RATIO) {
      this._resize(this._capacity * HashMap.SIZE_RATIO);
    }
    //FIND THE SLOT WHERE THIS KEY SHOULD BE IN
    const index = this._findSlot(key);

    if (!this._hashTable[index]) {
      this.length++;
    }
    this._hashTable[index] = {
      key,
      value,
      DELETED: false
    };
    //O(1) is best & average   O(n) worst case (if collision takes place)  
  }

  delete(key) {
    const index = this._findSlot(key);
    const slot = this._hashTable[index];
    if (slot === undefined) {
      throw new Error('Key error');
    }
    slot.DELETED = true;
    this.length--;
    this._deleted++;
  }




  /* ---------------------------------- */
  /* _find slot */
  /* ---------------------------------- */
  _findSlot(key) {
    const hash = HashMap._hashString(key);
    const start = hash % this._capacity;

    for (let i = start; i < start + this._capacity; i++) {
      const index = i % this._capacity;
      const slot = this._hashTable[index];

      if (slot === undefined || (slot.key === key && !slot.DELETED)) {
        return index;
      }
    }
  };
  //best case O(1) worstcase O(n) if you needed to search through each slot
  /* ---------------------------------- */
  /* _resize hash table */
  /* ---------------------------------- */

  _resize(size) {
    const oldSlots = this._hashTable;
    this._capacity = size;
    //reset the length = it will get rebuilt as you add teh items back
    this.length = 0;
    this.deleted = 0;
    this._hashTable = [];

    for (const slot of oldSlots) {
      if (slot !== undefined && !slot.DELETED) {
        this._hashTable(slot.key, slot.value)
      }
    }
    //O(1) is best & average   O(n) worst case (if collision takes place)
  };

  /* ---------------------------------- */
  /* hash string function */
  /* ---------------------------------- */
  static _hashString(string) {
    let hash = 5381;
    for (let i = 0; i < string.length; i++) {
      //Bitwise left shift with 5 0s - this would be similar to
      //hash*31, 31 being the decent prime number
      //but bit shifting is a faster way to do this
      //tradeoff is understandability
      hash = (hash << 5) + hash + string.charCodeAt(i);
      //converting hash to a 32 bit integer
      hash = hash & hash;
    }
    //making sure hash is unsigned - meaning non-negtive number. 
    return hash >>> 0;
  }
}

module.exports = HashMap;