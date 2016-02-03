/*
TODO remove
Third declension neuter.
nominative	nūmen	    nūmina
genitive	  nūminis	  nūminum
dative	    nūminī	  nūminibus
accusative	nūmen	    nūmina
ablative	  nūmine	  nūminibus
vocative	  nūmen	    nūmina

word sets look like this:
[
  {
      dec: '1' // declension
    , nom: 'puella',  nom_pl: 'puellae'
    , gen: 'puellae', gen_pl: 'puellarum'
    , dat: 'puellae', dat_pl: 'puellis'
    , acc: 'puellam', acc_pl: 'puellas'
    , abl: 'puella',  abl_pl: 'puellis'
  }
  , {
      dec: '2' // declension
    , nom: 'vinum',   nom_pl: 'vina'
    , gen: 'vini',    gen_pl: 'vinorum'
    , dat: 'vino',    dat_pl: 'vinis'
    , acc: 'vinum',   acc_pl: 'vina'
    , abl: 'vino',    abl_pl: 'vinis'
  }
];
*/

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
  text = removeMacrons(text.toLowerCase());

  var map = { // TODO make into: ['nominative', 'genitive', '...']
      nom: /nominative\s+([^\s]+)\s+([^\s]+)/g
    , gen: /genitive\s+([^\s]+)\s+([^\s]+)/g
    , dat: /dative\s+([^\s]+)\s+([^\s]+)/g
    , acc: /accusative\s+([^\s]+)\s+([^\s]+)/g
    , abl: /ablative\s+([^\s]+)\s+([^\s]+)/g
    // , voc: /vocative\s+([^\s]+)\s+([^\s]+)/g
  };


  var o = {};
  for (var key in map) {
    var res = map[key].exec(text);
    if (!res) throw new Error('could not find "' + key + '" in text');
    o[key]       = res[1];
    o[key+'_pl'] = res[2];
  }
  var res = /([^\s]+)\sdeclension/g.exec(text);
  o.dec = [null, 'first', 'second', 'third', 'fourth'].indexOf((res?res[1]:'').toLowerCase());
  if (o.dec == -1) {
    o.dec = null;
    console.warn('declension not found');
  }
  return o;
}

function template(templateid, data) {
  return document.getElementById(templateid).innerHTML.replace(/%(\w*)%/g, function(m, key){return data.hasOwnProperty(key)?data[key]:'';});
}
