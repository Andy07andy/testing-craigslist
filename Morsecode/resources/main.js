const charDataLetters = [
    { char: 'A', code: '• —', desc: 'Short dot leading into a dash.' },
    { char: 'B', code: '— • • •', desc: 'A dash followed by three dots.' },
    { char: 'C', code: '— • — •', desc: 'Dash, dot, dash, dot.' },
    { char: 'D', code: '— • •', desc: 'Dash followed by two dots.' },
    { char: 'E', code: '•', desc: 'Single dot, simplest letter.' },
    { char: 'F', code: '• • — •', desc: 'Two dots, a dash, then a dot.' },
    { char: 'G', code: '— — •', desc: 'Two dashes and a dot.' },
    { char: 'H', code: '• • • •', desc: 'Four dots in a row.' },
    { char: 'I', code: '• •', desc: 'Two short dots.' },
    { char: 'J', code: '• — — —', desc: 'A dot followed by three dashes.' },
    { char: 'K', code: '— • —', desc: 'Dash, dot, dash.' },
    { char: 'L', code: '• — • •', desc: 'Dot, dash, then two dots.' },
    { char: 'M', code: '— —', desc: 'Two dashes, simple for M.' },
    { char: 'N', code: '— •', desc: 'Dash then dot.' },
    { char: 'O', code: '— — —', desc: 'Three dashes in a row.' },
    { char: 'P', code: '• — — •', desc: 'Dot, two dashes, then a dot.' },
    { char: 'Q', code: '— — • —', desc: 'Like O but a dot before the last dash.' },
    { char: 'R', code: '• — •', desc: 'Dot, dash, dot pattern.' },
    { char: 'S', code: '• • •', desc: 'Three dots.' },
    { char: 'T', code: '—', desc: 'A single dash.' },
    { char: 'U', code: '• • —', desc: 'Two dots and a dash.' },
    { char: 'V', code: '• • • —', desc: 'Three dots then a dash.' },
    { char: 'W', code: '• — —', desc: 'A dot leading into two dashes.' },
    { char: 'X', code: '— • • —', desc: 'Dash, two dots, dash.' },
    { char: 'Y', code: '— • — —', desc: 'Like K but with an extra dash at the end.' },
    { char: 'Z', code: '— — • •', desc: 'Two dashes then two dots.' },
];

const charDataDigits = [
    { char: '0', code: '— — — — —', desc: 'All dashes.' },
    { char: '1', code: '• — — — —', desc: 'One dot followed by four dashes.' },
    { char: '2', code: '• • — — —', desc: 'Two dots then three dashes.' },
    { char: '3', code: '• • • — —', desc: 'Three dots, two dashes.' },
    { char: '4', code: '• • • • —', desc: 'Four dots, one dash.' },
    { char: '5', code: '• • • • •', desc: 'All dots.' },
    { char: '6', code: '— • • • •', desc: 'A dash followed by four dots.' },
    { char: '7', code: '— — • • •', desc: 'Two dashes, three dots.' },
    { char: '8', code: '— — — • •', desc: 'Three dashes, two dots.' },
    { char: '9', code: '— — — — •', desc: 'Four dashes, one dot.' },
];

const charDataPunctuation = [
    { char: '.', code: '• — • — • —', desc: 'Period: end of a sentence.' },
    { char: ',', code: '— — • • — —', desc: 'Comma: a strong pause.' },
    { char: '?', code: '• • — — • •', desc: 'Question mark: uncertainty.' },
    { char: '/', code: '— • • — •', desc: 'Slash: separates parts of a message.' },
    { char: ':', code: '— — — • • •', desc: 'Colon: three dashes and three dots.' },
    { char: ';', code: '— • — • — •', desc: 'Semicolon: alternating dash and dot.' },
    { char: '=', code: '— • • • —', desc: 'Equals sign: a pause similar to a colon.' },
    { char: '+', code: '• — • — •', desc: 'Plus: can mean "and".' },
    { char: '-', code: '— • • • • —', desc: 'Hyphen: a dash separated by dots.' },
    { char: '_', code: '• • — — • —', desc: 'Underscore: a space or emphasis.' },
    { char: '"', code: '• — • • — •', desc: 'Double quotes: encloses dialogue.' },
    { char: '\'', code: '• — — — — •', desc: 'Apostrophe: a dot, then four dashes, ending in a dot.' },
    { char: '$', code: '• • • — • • —', desc: 'Dollar sign: a rare extended symbol.' },
    { char: '@', code: '• — — • — •', desc: 'At sign: used in email addresses.' }
];

function createCharCards(data, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';
    data.forEach(item => {
        const card = document.createElement('div');
        card.classList.add('char-card');

        const title = document.createElement('h3');
        title.textContent = item.char;

        const code = document.createElement('div');
        code.classList.add('char-code');
        code.textContent = item.code;

        const desc = document.createElement('div');
        desc.classList.add('char-desc');
        desc.textContent = item.desc;

        card.appendChild(title);
        card.appendChild(code);
        card.appendChild(desc);
        container.appendChild(card);
    });
}

document.addEventListener('DOMContentLoaded', () => {
    createCharCards(charDataLetters, 'lettersGrid');
    createCharCards(charDataDigits, 'digitsGrid');
    createCharCards(charDataPunctuation, 'punctGrid');

    const buttons = document.querySelectorAll('.tab-button');
    const lettersGrid = document.getElementById('lettersGrid');
    const digitsGrid = document.getElementById('digitsGrid');
    const punctGrid = document.getElementById('punctGrid');
    const copyAllButton = document.getElementById('copyAllButton');
    const copyCurrentButton = document.getElementById('copyCurrentButton');

    let currentCategory = 'letters'; // default active tab

    buttons.forEach(btn => {
        btn.addEventListener('click', () => {
            buttons.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const target = btn.getAttribute('data-target');
            lettersGrid.classList.add('hidden');
            digitsGrid.classList.add('hidden');
            punctGrid.classList.add('hidden');

            if (target === 'letters') {
                lettersGrid.classList.remove('hidden');
                currentCategory = 'letters';
                copyCurrentButton.textContent = 'Copy Letters';
            } else if (target === 'digits') {
                digitsGrid.classList.remove('hidden');
                currentCategory = 'digits';
                copyCurrentButton.textContent = 'Copy Digits';
            } else if (target === 'punctuation') {
                punctGrid.classList.remove('hidden');
                currentCategory = 'punctuation';
                copyCurrentButton.textContent = 'Copy Punctuation';
            }
        });
    });

    // Function to format data for copying
    function formatData(dataArray, title) {
        let text = title + ':\n';
        dataArray.forEach(item => {
            text += `${item.char}: ${item.code} - ${item.desc}\n`;
        });
        text += '\n';
        return text;
    }

    copyAllButton.addEventListener('click', () => {
        let allText = '';
        allText += formatData(charDataLetters, 'LETTERS');
        allText += formatData(charDataDigits, 'DIGITS');
        allText += formatData(charDataPunctuation, 'PUNCTUATION');

        navigator.clipboard.writeText(allText)
            .then(() => {
                alert('All resources copied to clipboard!');
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });

    copyCurrentButton.addEventListener('click', () => {
        let textToCopy = '';
        if (currentCategory === 'letters') {
            textToCopy = formatData(charDataLetters, 'LETTERS');
        } else if (currentCategory === 'digits') {
            textToCopy = formatData(charDataDigits, 'DIGITS');
        } else if (currentCategory === 'punctuation') {
            textToCopy = formatData(charDataPunctuation, 'PUNCTUATION');
        }

        navigator.clipboard.writeText(textToCopy)
            .then(() => {
                alert(`Current ${currentCategory} copied to clipboard!`);
            })
            .catch(err => {
                console.error('Could not copy text: ', err);
            });
    });

    
});

document.getElementById('downloadPDFButton').addEventListener('click', () => {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Title
    doc.setFontSize(18);
    doc.text('Morse Code Resources', 10, 10);

    // Add sections
    const addDataToPDF = (title, data, yStart) => {
        doc.setFontSize(14);
        doc.text(title, 10, yStart);
        let y = yStart + 10;

        data.forEach(item => {
            const text = `${item.char}: ${item.code} - ${item.desc}`;
            doc.setFontSize(12);
            doc.text(text, 10, y);
            y += 10;
            if (y > 300) { // Add new page if needed
                doc.addPage();
                y = 10;
            }
        });
    };

    // Add Morse code data
    addDataToPDF('LETTERS', charDataLetters, 20);
    doc.addPage();
    addDataToPDF('DIGITS', charDataDigits, 20);
    doc.addPage();
    addDataToPDF('PUNCTUATION', charDataPunctuation, 20);

    // Save the PDF
    doc.save('Morse_Code_Resources.pdf');
});
