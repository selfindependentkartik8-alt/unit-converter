"use client";

import { useState } from "react";

type Category =
  | "Length"
  | "Weight"
  | "Temperature"
  | "Area"
  | "Volume"
  | "Speed"
  | "Time";

const units: Record<Category, string[]> = {
  Length: ["Meters", "Kilometers", "Centimeters", "Millimeters", "Miles", "Feet", "Inches"],
  Weight: ["Kilograms", "Grams", "Milligrams", "Pounds", "Ounces"],
  Temperature: ["Celsius", "Fahrenheit", "Kelvin"],
  Area: ["Square Meters", "Square Kilometers", "Square Feet", "Square Miles", "Acres"],
  Volume: ["Liters", "Milliliters", "Cubic Meters", "Cubic Feet", "Gallons"],
  Speed: ["Meters/Second", "Kilometers/Hour", "Miles/Hour", "Feet/Second"],
  Time: ["Seconds", "Minutes", "Hours", "Days", "Weeks"],
};

const toBase: Record<string, (v: number) => number> = {
  Meters: (v) => v,
  Kilometers: (v) => v * 1000,
  Centimeters: (v) => v / 100,
  Millimeters: (v) => v / 1000,
  Miles: (v) => v * 1609.344,
  Feet: (v) => v * 0.3048,
  Inches: (v) => v * 0.0254,

  Kilograms: (v) => v,
  Grams: (v) => v / 1000,
  Milligrams: (v) => v / 1000000,
  Pounds: (v) => v * 0.45359237,
  Ounces: (v) => v * 0.0283495231,

  "Square Meters": (v) => v,
  "Square Kilometers": (v) => v * 1000000,
  "Square Feet": (v) => v * 0.09290304,
  "Square Miles": (v) => v * 2589988.110336,
  Acres: (v) => v * 4046.8564224,

  Liters: (v) => v,
  Milliliters: (v) => v / 1000,
  "Cubic Meters": (v) => v * 1000,
  "Cubic Feet": (v) => v * 28.316846592,
  Gallons: (v) => v * 3.785411784,

  "Meters/Second": (v) => v,
  "Kilometers/Hour": (v) => v / 3.6,
  "Miles/Hour": (v) => v * 0.44704,
  "Feet/Second": (v) => v * 0.3048,

  Seconds: (v) => v,
  Minutes: (v) => v * 60,
  Hours: (v) => v * 3600,
  Days: (v) => v * 86400,
  Weeks: (v) => v * 604800,
};

const fromBase: Record<string, (v: number) => number> = {
  Meters: (v) => v,
  Kilometers: (v) => v / 1000,
  Centimeters: (v) => v * 100,
  Millimeters: (v) => v * 1000,
  Miles: (v) => v / 1609.344,
  Feet: (v) => v / 0.3048,
  Inches: (v) => v / 0.0254,

  Kilograms: (v) => v,
  Grams: (v) => v * 1000,
  Milligrams: (v) => v * 1000000,
  Pounds: (v) => v / 0.45359237,
  Ounces: (v) => v / 0.0283495231,

  "Square Meters": (v) => v,
  "Square Kilometers": (v) => v / 1000000,
  "Square Feet": (v) => v / 0.09290304,
  "Square Miles": (v) => v / 2589988.110336,
  Acres: (v) => v / 4046.8564224,

  Liters: (v) => v,
  Milliliters: (v) => v * 1000,
  "Cubic Meters": (v) => v / 1000,
  "Cubic Feet": (v) => v / 28.316846592,
  Gallons: (v) => v / 3.785411784,

  "Meters/Second": (v) => v,
  "Kilometers/Hour": (v) => v * 3.6,
  "Miles/Hour": (v) => v / 0.44704,
  "Feet/Second": (v) => v / 0.3048,

  Seconds: (v) => v,
  Minutes: (v) => v / 60,
  Hours: (v) => v / 3600,
  Days: (v) => v / 86400,
  Weeks: (v) => v / 604800,
};

function convertTemperature(
  value: number,
  from: string,
  to: string
) {
  let celsius = value;

  if (from === "Fahrenheit") {
    celsius = (value - 32) * (5 / 9);
  }

  if (from === "Kelvin") {
    celsius = value - 273.15;
  }

  if (to === "Celsius") return celsius;

  if (to === "Fahrenheit") {
    return celsius * (9 / 5) + 32;
  }

  return celsius + 273.15;
}

export default function Home() {
  const [category, setCategory] = useState<Category>("Length");
  const [from, setFrom] = useState("Meters");
  const [to, setTo] = useState("Kilometers");
  const [value, setValue] = useState("1");
  const [result, setResult] = useState<number | null>(null);

  const changeCategory = (newCategory: Category) => {
    setCategory(newCategory);

    const first = units[newCategory][0];
    const second = units[newCategory][1];

    setFrom(first);
    setTo(second);
    setResult(null);
  };

  const convert = () => {
    const number = Number(value);

    if (!Number.isFinite(number)) {
      setResult(null);
      return;
    }

    let converted: number;

    if (category === "Temperature") {
      converted = convertTemperature(number, from, to);
    } else {
      const base = toBase[from](number);
      converted = fromBase[to](base);
    }

    setResult(converted);
  };

  const swapUnits = () => {
    setFrom(to);
    setTo(from);
    setResult(null);
  };

  const scrollToConverter = () => {
    document
      .getElementById("converter")
      ?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-white">

      {/* ====================================================== */}
      {/* MAGENTA → BLACK BACKGROUND */}
      {/* ====================================================== */}

      <div className="pointer-events-none absolute inset-0 overflow-hidden">

        <div className="absolute inset-x-0 top-0 h-[1100px] bg-gradient-to-b from-fuchsia-950 via-fuchsia-950/70 to-black" />

        <div className="absolute left-1/2 top-[-250px] h-[650px] w-[850px] -translate-x-1/2 rounded-full bg-fuchsia-500/20 blur-[150px]" />

        <div className="absolute left-[-220px] top-[35%] h-[450px] w-[450px] rounded-full bg-pink-600/10 blur-[150px]" />

        <div className="absolute right-[-220px] top-[52%] h-[450px] w-[450px] rounded-full bg-fuchsia-500/10 blur-[150px]" />

        <div className="absolute inset-x-0 top-[650px] h-[1000px] bg-gradient-to-b from-transparent via-black/75 to-black" />
      </div>

      {/* ====================================================== */}
      {/* NAVBAR */}
      {/* ====================================================== */}

      <nav className="relative z-30 mx-auto w-full max-w-6xl px-4 pt-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between rounded-2xl border border-white/[0.08] bg-black/40 px-4 py-3 shadow-2xl backdrop-blur-2xl sm:px-5">

          <div className="flex items-center gap-3">
            <div className="relative h-10 w-10 overflow-hidden rounded-full border border-fuchsia-400/20 bg-white/10 shadow-lg shadow-fuchsia-500/10">
              <img
                src="/logo.png"
                alt="KrishAIWorks Logo"
                className="h-full w-full object-cover"
              />
            </div>

            <div>
              <h2 className="text-sm font-bold tracking-tight sm:text-base">
                KrishAIWorks
              </h2>

              <p className="text-[9px] font-medium tracking-wide text-zinc-500 sm:text-[10px]">
                AI Solutions That Work
              </p>
            </div>
          </div>

          <div className="hidden items-center gap-1 md:flex">
            <a
              href="#features"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-fuchsia-300"
            >
              Features
            </a>

            <a
              href="#how"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-fuchsia-300"
            >
              How To Use
            </a>

            <a
              href="#faq"
              className="rounded-xl px-4 py-2 text-sm text-zinc-400 transition hover:bg-white/[0.05] hover:text-fuchsia-300"
            >
              FAQ
            </a>

            <button
              onClick={scrollToConverter}
              className="ml-2 rounded-xl bg-fuchsia-500 px-5 py-2 text-sm font-semibold text-white shadow-lg shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-400 active:scale-95"
            >
              Try Now
            </button>
          </div>

          <button
            onClick={scrollToConverter}
            className="rounded-xl border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs font-semibold text-fuchsia-300 transition hover:bg-fuchsia-500/20 md:hidden"
          >
            Try Now
          </button>
        </div>
      </nav>

      {/* ====================================================== */}
      {/* HERO */}
      {/* ====================================================== */}

      <section className="relative z-10 mx-auto flex w-full max-w-6xl flex-col items-center px-5 pb-20 pt-20 text-center sm:px-8 sm:pt-24">

        <div className="rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs text-fuchsia-200 shadow-lg shadow-fuchsia-950/30 backdrop-blur-xl">
          🔄 Fast & Accurate Conversions
        </div>

        <p className="mt-4 text-xs text-zinc-500">
          Built by{" "}
          <span className="font-semibold text-fuchsia-400">
            KrishAIWorks
          </span>
        </p>

        <h1 className="mt-7 max-w-4xl text-4xl font-extrabold leading-[1.08] tracking-tight sm:text-6xl lg:text-7xl">
          Convert Anything.
          <br />
          <span className="bg-gradient-to-r from-fuchsia-300 via-pink-400 to-purple-500 bg-clip-text text-transparent">
            In Seconds.
          </span>
        </h1>

        <p className="mt-6 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base sm:leading-8">
          Convert length, weight, temperature, area, volume, speed and time
          instantly with a simple and powerful unit converter.
        </p>

        <div className="mt-7 flex flex-wrap justify-center gap-2.5">
          <Pill text="📏 Multiple Units" />
          <Pill text="⚡ Instant Results" />
          <Pill text="📱 Mobile Friendly" />
        </div>

        {/* ====================================================== */}
        {/* CONVERTER */}
        {/* ====================================================== */}

        <div
          id="converter"
          className="mt-12 w-full max-w-4xl scroll-mt-8"
        >
          <div className="rounded-[2rem] border border-fuchsia-400/10 bg-zinc-950/60 p-5 shadow-2xl shadow-fuchsia-950/30 backdrop-blur-2xl sm:p-7">

            <div className="mb-6 text-left">
              <div className="inline-flex rounded-full border border-fuchsia-400/10 bg-fuchsia-500/5 px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.2em] text-fuchsia-400">
                Unit Converter
              </div>

              <h2 className="mt-4 text-xl font-bold sm:text-2xl">
                Convert your units instantly.
              </h2>

              <p className="mt-1 text-xs text-zinc-500 sm:text-sm">
                Choose a category, enter a value and get an accurate result.
              </p>
            </div>

            {/* CATEGORY */}

            <div className="mb-6 grid grid-cols-2 gap-2 sm:grid-cols-4 lg:grid-cols-7">
              {(Object.keys(units) as Category[]).map((item) => (
                <button
                  key={item}
                  onClick={() => changeCategory(item)}
                  className={`rounded-xl border px-3 py-2.5 text-xs font-semibold transition ${
                    category === item
                      ? "border-fuchsia-400/30 bg-fuchsia-500 text-white shadow-lg shadow-fuchsia-500/10"
                      : "border-white/10 bg-white/[0.03] text-zinc-400 hover:bg-white/[0.06]"
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* INPUT */}

            <div className="grid gap-4 md:grid-cols-[1fr_auto_1fr] md:items-end">

              <div className="text-left">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-400">
                  From
                </label>

                <input
                  type="number"
                  value={value}
                  onChange={(e) => setValue(e.target.value)}
                  className="h-14 w-full rounded-2xl border border-fuchsia-400/20 bg-black/40 px-5 text-base text-white outline-none transition focus:border-fuchsia-400 focus:ring-2 focus:ring-fuchsia-400/20"
                  placeholder="Enter value"
                />

                <select
                  value={from}
                  onChange={(e) => {
                    setFrom(e.target.value);
                    setResult(null);
                  }}
                  className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black px-4 text-sm text-white outline-none focus:border-fuchsia-400"
                >
                  {units[category].map((unit) => (
                    <option key={unit}>{unit}</option>
                  ))}
                </select>
              </div>

              <button
                onClick={swapUnits}
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 text-lg text-fuchsia-300 transition hover:bg-fuchsia-500/20 active:scale-90"
                aria-label="Swap units"
              >
                ⇄
              </button>

              <div className="text-left">
                <label className="mb-2 block text-xs font-semibold uppercase tracking-[0.18em] text-fuchsia-400">
                  To
                </label>

                <div className="h-14 w-full rounded-2xl border border-white/10 bg-black/40 px-5 py-4 text-base text-zinc-500">
                  Result appears below
                </div>

                <select
                  value={to}
                  onChange={(e) => {
                    setTo(e.target.value);
                    setResult(null);
                  }}
                  className="mt-3 h-12 w-full rounded-2xl border border-white/10 bg-black px-4 text-sm text-white outline-none focus:border-fuchsia-400"
                >
                  {units[category].map((unit) => (
                    <option key={unit}>{unit}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* CONVERT BUTTON */}

            <button
              onClick={convert}
              className="mt-6 h-14 w-full rounded-2xl bg-fuchsia-500 px-7 text-sm font-bold text-white shadow-xl shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-400 active:scale-[0.99]"
            >
              ⚡ Convert Now
            </button>

            {/* RESULT */}

            {result !== null && (
              <div className="mt-7 rounded-2xl border border-fuchsia-400/10 bg-black/50 p-5 text-left sm:p-7">

                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-fuchsia-400">
                      Conversion Result
                    </p>

                    <h3 className="mt-3 break-all text-2xl font-bold text-white sm:text-3xl">
                      {formatNumber(result)}
                    </h3>

                    <p className="mt-2 text-sm text-zinc-500">
                      {value} {from} = {formatNumber(result)} {to}
                    </p>
                  </div>

                  <span className="w-fit rounded-full border border-fuchsia-400/20 bg-fuchsia-500/10 px-4 py-2 text-xs font-medium text-fuchsia-300">
                    ✓ Converted
                  </span>

                </div>
              </div>
            )}

          </div>
        </div>
      </section>

      {/* ====================================================== */}
      {/* WHY USE IT */}
      {/* ====================================================== */}

      <section
        id="features"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto inline-flex rounded-full border border-fuchsia-400/10 bg-fuchsia-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            Why Use It
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Conversions made{" "}
            <span className="text-fuchsia-400">
              simple.
            </span>
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Everything you need for quick and reliable everyday conversions.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <FeatureCard
            icon="⚡"
            number="01"
            title="Instant Results"
            description="Convert values instantly without complicated formulas or manual calculations."
          />

          <FeatureCard
            icon="🎯"
            number="02"
            title="Accurate"
            description="Built-in conversion factors provide precise results across multiple categories."
          />

          <FeatureCard
            icon="📱"
            number="03"
            title="Easy To Use"
            description="A clean responsive interface that works smoothly on phones, tablets and desktops."
          />

        </div>
      </section>

      {/* ====================================================== */}
      {/* HOW TO USE */}
      {/* ====================================================== */}

      <section
        id="how"
        className="relative z-10 mx-auto w-full max-w-6xl scroll-mt-10 px-5 py-24 sm:px-8"
      >
        <div className="mx-auto max-w-2xl text-center">

          <div className="mx-auto inline-flex rounded-full border border-fuchsia-400/10 bg-fuchsia-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            How To Use
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Three simple steps.
          </h2>

          <p className="mt-4 text-sm leading-7 text-zinc-500">
            Convert any supported unit in just a few seconds.
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">

          <StepCard
            number="01"
            title="Choose Category"
            description="Select length, weight, temperature, area, volume, speed or time."
          />

          <StepCard
            number="02"
            title="Enter Value"
            description="Enter the number you want to convert and choose your source and target units."
          />

          <StepCard
            number="03"
            title="Get Result"
            description="Tap Convert Now and instantly see the converted value."
          />

        </div>
      </section>

      {/* ====================================================== */}
      {/* FAQ */}
      {/* ====================================================== */}

      <section
        id="faq"
        className="relative z-10 mx-auto w-full max-w-3xl scroll-mt-10 px-5 py-24 sm:px-8"
      >

        <div className="text-center">

          <div className="mx-auto inline-flex rounded-full border border-fuchsia-400/10 bg-fuchsia-500/5 px-4 py-2 text-xs font-semibold uppercase tracking-[0.2em] text-fuchsia-400">
            FAQ
          </div>

          <h2 className="mt-5 text-3xl font-bold tracking-tight sm:text-4xl">
            Frequently Asked Questions
          </h2>

        </div>

        <div className="mt-10 space-y-4">

          <Faq
            question="Which units can I convert?"
            answer="The converter currently supports length, weight, temperature, area, volume, speed and time conversions."
          />

          <Faq
            question="Are the conversion results accurate?"
            answer="Yes. Standard conversion factors are used for supported units."
          />

          <Faq
            question="Does it work on mobile?"
            answer="Yes. The entire interface is responsive and optimized for phones, tablets and desktops."
          />

          <Faq
            question="Is the unit converter free?"
            answer="Yes. You can use the converter completely free."
          />

        </div>
      </section>

      {/* ====================================================== */}
      {/* CTA */}
      {/* ====================================================== */}

      <section className="relative z-10 mx-auto w-full max-w-5xl px-5 py-20 sm:px-8">

        <div className="relative overflow-hidden rounded-[2rem] border border-fuchsia-400/10 bg-gradient-to-br from-fuchsia-950/60 via-zinc-950/80 to-black px-6 py-14 text-center shadow-2xl shadow-fuchsia-950/30 backdrop-blur-xl sm:px-12">

          <div className="pointer-events-none absolute left-1/2 top-[-180px] h-[350px] w-[500px] -translate-x-1/2 rounded-full bg-fuchsia-500/10 blur-[120px]" />

          <div className="relative">

            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl border border-fuchsia-400/20 bg-fuchsia-500/10 text-2xl shadow-lg shadow-fuchsia-500/10">
              🔄
            </div>

            <p className="mt-6 text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400">
              KrishAIWorks
            </p>

            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-4xl">
              Convert your next value instantly.
            </h2>

            <p className="mx-auto mt-4 max-w-xl text-sm leading-7 text-zinc-500">
              Simple conversions. Accurate results. No unnecessary complexity.
            </p>

            <button
              onClick={scrollToConverter}
              className="mt-8 inline-flex rounded-xl bg-fuchsia-500 px-7 py-3 text-sm font-semibold text-white shadow-xl shadow-fuchsia-500/20 transition hover:-translate-y-0.5 hover:bg-fuchsia-400 active:scale-95"
            >
              ⚡ Try It Now
            </button>

          </div>
        </div>
      </section>

{/* ====================================================== */}
{/* FOOTER */}
{/* ====================================================== */}

<footer className="relative z-10 border-t border-white/5 px-5 py-10">

  <div className="mx-auto max-w-6xl">

    {/* RELATED TOOLS */}

    <div className="mb-10">

      <div className="mb-6 text-center">

        <p className="text-xs font-semibold uppercase tracking-[0.25em] text-fuchsia-400/70">
          Explore More
        </p>

        <h3 className="mt-2 text-2xl font-bold text-white">
          More Useful Tools
        </h3>

        <p className="mx-auto mt-2 max-w-xl text-sm text-zinc-500">
          Explore more free tools from KrishAIWorks to simplify
          your everyday digital tasks.
        </p>

      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">

        {/* Timestamp Converter */}

        <a
          href="https://timestampconverter.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-lg">
            🕐
          </div>

          <h4 className="font-semibold text-white transition-colors group-hover:text-fuchsia-400">
            Timestamp Converter
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Convert Unix timestamps into readable dates and times.
          </p>

        </a>


        {/* JSON Formatter & Validator */}

        <a
          href="https://jsonformattervalidator.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-lg">
            {"{}"}
          </div>

          <h4 className="font-semibold text-white transition-colors group-hover:text-fuchsia-400">
            JSON Formatter &amp; Validator
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Format, validate, and clean JSON data effortlessly.
          </p>

        </a>


        {/* Base64 Encoder & Decoder */}

        <a
          href="https://base64encoderdecoder.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-lg">
            &lt;/&gt;
          </div>

          <h4 className="font-semibold text-white transition-colors group-hover:text-fuchsia-400">
            Base64 Encoder &amp; Decoder
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Encode and decode Base64 text instantly.
          </p>

        </a>


        {/* Markdown → HTML Converter */}

        <a
          href="https://markdownhtmlconverter.krishaiworks.com/"
          className="group rounded-2xl border border-white/10 bg-white/[0.03] p-5 transition-all duration-300 hover:-translate-y-1 hover:border-fuchsia-400/30 hover:bg-fuchsia-400/[0.04]"
        >

          <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-xl border border-fuchsia-400/20 bg-fuchsia-400/10 text-lg">
            📝
          </div>

          <h4 className="font-semibold text-white transition-colors group-hover:text-fuchsia-400">
            Markdown → HTML Converter
          </h4>

          <p className="mt-2 text-xs leading-5 text-zinc-500">
            Convert Markdown into clean HTML instantly.
          </p>

        </a>

      </div>

    </div>


    {/* ORIGINAL FOOTER */}

    <div className="flex flex-col items-center justify-between gap-7 border-t border-white/10 pt-8 sm:flex-row">

      <div className="flex items-center gap-3">

        <img
          src="/logo.png"
          alt="KrishAIWorks Logo"
          className="h-12 w-12 rounded-full border border-fuchsia-400/20 object-cover shadow-lg shadow-fuchsia-500/10"
        />

        <div>
          <p className="font-semibold text-white">
            KrishAIWorks
          </p>

          <p className="mt-1 text-xs text-zinc-600">
            AI Solutions That Work
          </p>
        </div>

      </div>

      <a
        href="https://instagram.com/KrishAIWorks"
        target="_blank"
        rel="noopener noreferrer"
        className="text-sm text-zinc-500 transition hover:text-fuchsia-400"
      >
        Instagram · @KrishAIWorks
      </a>

      <div className="text-center sm:text-right">

        <p className="text-xs text-zinc-600">
          © {new Date().getFullYear()} KrishAIWorks
        </p>

        <p className="mt-1 text-xs text-zinc-700">
          Built with AI.
        </p>

      </div>

    </div>

  </div>

</footer>

    </main>
  );
}

/* ====================================================== */
/* HELPERS */
/* ====================================================== */

function formatNumber(value: number) {
  if (!Number.isFinite(value)) return "Invalid";

  return Number(
    value.toPrecision(12)
  ).toLocaleString("en-US", {
    maximumFractionDigits: 10,
  });
}

function Pill({ text }: { text: string }) {
  return (
    <span className="rounded-full border border-white/5 bg-white/[0.04] px-4 py-2 text-xs text-zinc-300 backdrop-blur-xl">
      {text}
    </span>
  );
}

function FeatureCard({
  icon,
  number,
  title,
  description,
}: {
  icon: string;
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="group relative overflow-hidden rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-xl transition hover:border-fuchsia-400/20">

      <div className="text-3xl">
        {icon}
      </div>

      <p className="mt-5 text-xs font-bold tracking-[0.2em] text-fuchsia-400">
        {number}
      </p>

      <h3 className="mt-2 text-lg font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

function StepCard({
  number,
  title,
  description,
}: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <div className="rounded-3xl border border-white/10 bg-zinc-950/60 p-7 backdrop-blur-xl">

      <p className="text-xs font-black tracking-[0.25em] text-fuchsia-400">
        {number}
      </p>

      <h3 className="mt-4 font-bold text-white">
        {title}
      </h3>

      <p className="mt-3 text-sm leading-7 text-zinc-500">
        {description}
      </p>

    </div>
  );
}

function Faq({
  question,
  answer,
}: {
  question: string;
  answer: string;
}) {
  return (
    <details className="group rounded-2xl border border-white/10 bg-zinc-950/60 p-5 backdrop-blur-xl">

      <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold text-white">
        <span>{question}</span>

        <span className="text-xl text-fuchsia-400 transition group-open:rotate-45">
          +
        </span>
      </summary>

      <p className="mt-4 text-sm leading-7 text-zinc-500">
        {answer}
      </p>

    </details>
  );
}