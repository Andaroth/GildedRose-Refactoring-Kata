export class Item {
    name: string;
    sellIn: number;
    quality: number;

    constructor(name, sellIn, quality) {
        this.name = name;
        this.sellIn = sellIn;
        this.quality = quality;
    }
} // left class untouched

export class ConjuredItem extends Item {
    conjured?: boolean;
    constructor(name,sellIn,quality,conjured?) {
        super(name,sellIn,quality);
        this.conjured = conjured || (name && name.toLowerCase().indexOf('conjured') != -1);
    }
} // extends Item to add conjured prop

export class GildedRose {
    items: Array<ConjuredItem>;

    constructor(items = [] as Array<ConjuredItem>) {
        this.items = items;
    }

    isBrie(item) { return item && item.name && item.name === 'Aged Brie'; }
    isElite(item) { return item && item.name && item.name === 'Backstage passes to a TAFKAL80ETC concert'; }
    isSulfuras(item) { return item && item.name && item.name === 'Sulfuras, Hand of Ragnaros'; }
    isBroken(item) { return item && item.quality && item.quality <= 0; }
    isLegendary(item) { return this.isSulfuras(item) }
    isQualityMax(item) { return item && item.quality && (!this.isLegendary(item)) ? item.quality >= 50 : item.quality >= 80; }
    isOutdated(item) { return item && item.sellIn && item.sellIn <= 0; }
    // new props
    isConjured(item) { return item && item.conjured || false; }

    updateQuality() {
        this.items.forEach((item,idx)=>{
            if (!this.isBrie(item) && !this.isElite(item)) { // NOT brie && NOT elite
                if (!this.isBroken(item)) { // NOT broken
                    if (!this.isSulfuras(item)) {
                        if (!this.isConjured(item)) { item.quality -= 1; }
                        else { item.quality -= 2; }
                    }
                }
            } else if (!this.isQualityMax(item)) { // if quality NOT MAX
                item.quality += 1;
                if (this.isElite(item)) { // IS 80etc
                    if (item.sellIn <= 10) { // 10 or less
                        if (!this.isQualityMax(item)) { item.quality += 1; } // one more
                    }
                    if (item.sellIn <= 5) { // 5 or less day left
                        if (!this.isQualityMax(item)) { item.quality += 1; } // one more
                    }
                }
            }
            if (this.isOutdated(item)) { // outdated !
                if (!this.isBrie(item)) { // not brie
                    if (!this.isElite(item)) { // not 80etc
                        if (!this.isBroken(item)) { // not broken
                            if (!this.isSulfuras(item)) { // not sulfuras
                                if (!this.isConjured(item)) { item.quality -= 1; }
                                else { item.quality -= 2; }
                            }
                        }
                    }
                } else { // IS BRIE
                    if (!this.isQualityMax(item)) { item.quality += 1; }
                }
            }
            if (!this.isSulfuras(item)) { item.sellIn -= 1; }// end of the day, remove 1 durability
            this.items[idx] = item;
        });
        return this.items;
    }
}
/* For The Horde */
