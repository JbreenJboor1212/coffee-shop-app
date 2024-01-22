

export function filterSameData(coffeeList) {
    //! Fetch Data
    const nameCategory = coffeeList?.map((category) => category?.name);
    //! Filter Data
    for (let i = 0; i <= nameCategory.length - 1; i++) {
        if (nameCategory[i] !== nameCategory[i + 1]) {
            i++
        }
        nameCategory.splice(i, 1);
        i--;
    }
    //! Add Shift
    nameCategory.unshift("All");

    return nameCategory
}

