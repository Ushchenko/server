function viewProductDetails(product) {
	// спочатку перевіряємо значення поля name у об'єкті product
	if (product.name.length > 50) {
		return 0;
	}

	// потім перевіряємо значення поля manufacturer у об'єкті product
	if (product.manufacturer.length > 80) {
		return 0;
	}

	// спочатку перевіряємо значення поля price у об'єкті product
	if (!(product.price >= 0 & product.price < 100000)) {
		return 0;
	}
	//якщо одна із цих перевірок виконається, то програма поверне значення 0
	//це означає, що є помлка

	// якщо всі провірки не пройли, то все правильно
	//функція повертає значення product
	return product;
}

let result = viewProductDetails({
  name: "ThermoPro",
  manufacturer: "AcuRite",
  price: 4.2,
})

if(result === 0) console.log("TC1.1: failed")
else console.log("TC1.1: passed")

result = viewProductDetails({
  name: "Thermoooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooooo",
  manufacturer: "ThermoPro",
  price: 6.99,
})

if(result === 0) console.log("TC1.2: failed")
else console.log("TC1.2: passed")

result = viewProductDetails({
  name: "Rite",
  manufacturer: "AcuRiteeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee",
  price: 2.45,
})

if(result === 0) console.log("TC1.3: failed")
else console.log("TC1.3: passed")

result = viewProductDetails({
  name: "Flow",
  manufacturer: "AcuRite",
  price: -1,
})

if(result === 0) console.log("TC1.4: failed")
else console.log("TC1.4: passed")
