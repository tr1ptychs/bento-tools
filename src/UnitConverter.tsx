import { useState, useEffect } from "react";

type LinearUnitMap = Record<string, number>;

type FunctionalUnitMap = Record<
  string,
  {
    toBase: (val: number) => number;
    fromBase: (val: number) => number;
  }
>;

type Converter =
  | { type: "linear"; units: LinearUnitMap }
  | { type: "functional"; units: FunctionalUnitMap };

type UnitCategory = "length" | "temperature" | "mass";

type ConverterMap = Record<UnitCategory, Converter>;

const converterMap: ConverterMap = {
  length: {
    type: "linear",
    units: {
      m: 1, // base
      cm: 100, // 1 m = 100 cm
      mm: 1000, // 1 m = 1000 mm
      in: 39.3701, // 1 m = ~39.37 in
      ft: 3.28084, // 1 m = ~3.28 ft
      mi: 0.000621371, // 1 m = ~ 0.000621 mi
      km: 0.001, // 1 m = 0.001 km
    },
  },
  mass: {
    type: "linear",
    units: {
      kg: 1, // base
      g: 1000, // 1 kg = 1000 g
      lb: 2.20462, // 1 kg = 2.20462 lb
      oz: 35.264, // 1 kg = 35.264 oz
    },
  },
  temperature: {
    type: "functional",
    units: {
      C: {
        toBase: (x) => x,
        fromBase: (x) => x,
      },
      F: {
        toBase: (x) => ((x - 32) * 5) / 9,
        fromBase: (x) => (x * 9) / 5 + 32,
      },
      K: {
        toBase: (x) => x - 273.15,
        fromBase: (x) => x + 273.15,
      },
    },
  },
};

function convert(
  category: UnitCategory,
  value: number,
  from: string,
  to: string,
): number {
  const converter = converterMap[category];

  if (converter.type === "linear") {
    const base = value / converter.units[from];
    return base * converter.units[to];
  }

  if (converter.type === "functional") {
    const base = converter.units[from].toBase(value);
    return converter.units[to].fromBase(base);
  }

  throw new Error("Invalid conversion");
}

function UnitConverter() {
  const [category, setCategory] = useState<UnitCategory>("length");
  const unitOptions = Object.keys(converterMap[category].units);
  const [fromUnit, setFromUnit] = useState(unitOptions[0]);
  const [fromValue, setFromValue] = useState(1);
  const [toUnit, setToUnit] = useState(unitOptions[1]);
  const [toValue, setToValue] = useState(1);

  useEffect(() => {
    const units = Object.keys(converterMap[category].units);
    const initialFrom = units[0];
    const initialTo = units[1];
    const initialValue = 1;

    setFromUnit(initialFrom);
    setToUnit(initialTo);
    setFromValue(initialValue);
    setToValue(convert(category, initialValue, initialFrom, initialTo));
  }, [category]);

  useEffect(() => {
    if (fromUnit && toUnit) {
      const result = convert(category, fromValue, fromUnit, toUnit);
      setToValue(result);
    }
    // category is stable here because unit reset + conversion is handled on category change.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fromUnit, toUnit, fromValue]);

  return (
    <>
      <div>
        <select onChange={(e) => setCategory(e.target.value as UnitCategory)}>
          <option value="length">Length</option>
          <option value="mass">Mass</option>
          <option value="temperature">Temperature</option>
        </select>
      </div>
      <div className="flex justify-between items-center gap-4">
        <select
          value={fromUnit}
          onChange={(e) => setFromUnit(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <input
          className="border rounded px-2 py-1"
          type="number"
          value={String(fromValue)}
          onChange={(e) => setFromValue(Number(e.target.value))}
        />
      </div>
      <div className="flex justify-between items-center gap-4">
        <select
          value={toUnit}
          onChange={(e) => setToUnit(e.target.value)}
          className="border rounded px-2 py-1"
        >
          {unitOptions.map((unit) => (
            <option key={unit} value={unit}>
              {unit}
            </option>
          ))}
        </select>

        <input
          className="border rounded px-2 py-1"
          type="number"
          value={toValue.toFixed(4)}
          readOnly
        />
      </div>
    </>
  );
}

export default UnitConverter;
