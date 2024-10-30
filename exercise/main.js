function c0() {
    const paragraphs = document.getElementsByTagName('p');
    document.getElementById('he').innerText = `There are ${paragraphs.length} paragraph tags on this page.`;
  }

  function c1() {
    const c1 = document.getElementById('c1').children.length;
    document.getElementById('she').innerText = `There are ${c1} electronic devices.`;
  }

  function c2() {
    const c2 = document.getElementById('c2').children.length;
    document.getElementById('it').innerText = `There are ${c2} beverages I liked.`;
  }