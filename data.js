// Tournament data, shared by the English page (/) and the Russian page (/ru/).
// Edit this file only: both pages update together.

// Teams: [in-game name, faction, Discord]; '' = not given yet (shown as "?")
const T={
 a:{n:'Anglo-Soviet Treaty of 1942',p:[['Thentox','Astra Militarum','Thentox'],['Exarsist',"T'au",'exarsist']]},
 b:{n:'Team R',p:[['Гробовщик','Orks','.slizen'],['дядя ugrep','Space Marines','ugrep']]},
 c:{n:'What',p:[['Who','Adeptus Mechanicus','fonrir'],['Why','Space Marines','pepsioriginal']]},
 d:{n:'Azure Legion of Phobetor',p:[['ddutch.guyy','Astra Militarum','Dutch_Guy'],['Peikko13','Space Marines','Peikko13']]},
 e:{n:'Space gypsies',p:[['ВАГХ','Chaos Space Marines','HUNTE44'],['Shishkosvin','Craftworld Aeldari','andruxavelichajshijizandrux']]},
 f:{n:'Daughters of the Four-Armed Emperor',p:[['Greed','Adepta Sororitas','Greed'],['Creme','Tyranids','CremeBrouillet']]},
 g:{n:'Gorky Boyz',p:[['Skifling','Craftworld Aeldari','Skifling'],['SHYMASTORM','Orks','SHYMASTORM']]},
 h:{n:'The B-Team',p:[['Johannes',"T'au",'Johannes'],['Blizzard','Craftworld Aeldari','Blizzard']]}
};

// Solo players without a team: [in-game name, faction, Discord, note]
const S=[
 ['OldManSart','Craftworld Aeldari','sart_rts',''],
 ['icestorm845','Adeptus Mechanicus','mothmanhighpriest','']
];

// Rounds: one array per round, each match [teamA, teamB, winner or '', status]
// Use '_' as team key for a slot that is not decided yet.
// Status 'Not scheduled yet' is translated automatically; any other text (e.g. a date) is shown as written.
const R=[
 [['_','_','','Not scheduled yet'],['_','_','','Not scheduled yet'],['_','_','','Not scheduled yet'],['_','_','','Not scheduled yet'],['_','_','','Not scheduled yet']],
 [],[],[],[]
];

// Style Points, highest first: [team key, points, reason]
const SP=[];
