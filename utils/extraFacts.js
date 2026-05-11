module.exports = (text) => {
      const facts = [];

        if (text.includes("i like")) facts.push(text);
        if (text.includes("i love")) facts.push(text);
        if (text.includes("i play")) facts.push(text);

        return facts;
    };