function shuffle(array) {
  var tmp, current, top = array.length;
  if (top) while(--top) {
    current = Math.floor(Math.random() * (top + 1));
    tmp = array[current];
    array[current] = array[top];
    array[top] = tmp;
  }
  return array;
}

function removeMacrons(text) {
  return text.replace(/ā/g,'a').replace(/Ã/g,'A')
             .replace(/ē/g,'e').replace(/Ē/g,'E')
             .replace(/ī/g,'i').replace(/Ī/g,'I')
             .replace(/ō/g,'o').replace(/Õ/g,'O')
             .replace(/ū/g,'u').replace(/Ū/g,'U');
}

function parse(text) {
  return text.trim().split('\n\n').map(wordObjectFrom);
}

function wordObjectFrom(text) {
  text = text.toLowerCase();

  var o = {};
  ['nominative', 'genitive', 'dative', 'accusative', 'ablative'/*, 'vocative'*/].map(function(caze) {
    var res = (new RegExp(caze + '\\s+(.+?)\\s\\s+(.+)', 'g')).exec(text);
    if (!res) throw new Error('could not find "' + caze + '" in text');
    o[caze.substr(0, 3)]         = res[1];
    o[caze.substr(0, 3) + '_pl'] = res[2];
  });
  o.gender = (/(.+)\sgender/g.exec(text) || ['', '?'])[1];
  o.dec = (/\s*(.+)\sdeclension/g.exec(text) || ['', false])[1];
  if (!o.dec) console.warn('declension not found');
  return o;
}

function template(templateid, data) {
  return document.getElementById(templateid).innerHTML.replace(/%(\w*)%/g, function(m, key){return data.hasOwnProperty(key)?data[key]:'';});
}
