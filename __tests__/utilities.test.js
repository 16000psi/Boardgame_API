const {countComments} = require ("./../utilities");



const reviews = [
    {
      review_id: 1,
      title: 'Culture a Love of Agriculture With Agricola',
      category: 'strategy',
      designer: 'Uwe Rosenberg',
      owner: 'tickle122',
      review_body: "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
      review_img_url: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:00:20.514Z",
      votes: 1
    },
    {
      review_id: 2,
      title: 'JengARRGGGH!',
      category: 'dexterity',
      designer: 'Leslie Scott',
      owner: 'grumpy19',
      review_body: "Few games are equiped to fill a player with such a defined sense of mild-peril, but a friendly game of Jenga will turn the mustn't-make-it-fall anxiety all the way up to 11! Fiddly fun for all the family, this game needs little explaination. Whether you're a player who chooses to play it safe, or one who lives life on the edge, eventually the removal of blocks will destabilise the tower and all your Jenga dreams come tumbling down.",
      review_img_url: 'https://images.pexels.com/photos/4473494/pexels-photo-4473494.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 5
    },
    {
      review_id: 3,
      title: 'Karma Karma Chameleon',
      category: 'hidden-roles',
      designer: 'Rikki Tahta',
      owner: 'happyamy2016',
      review_body: 'Try to trick your friends. If you find yourself being dealt the Chamelean card then the aim of the game is simple; blend in... Meanwhile the other players aim to be as vague as they can to not give the game away ',
      review_img_url: 'https://images.pexels.com/photos/45868/chameleon-reptile-lizard-green-45868.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:42.151Z",
      votes: 5
    },
    {
      review_id: 4,
      title: 'One Night Ultimate Werewolf',
      category: 'hidden-roles',
      designer: 'Akihisa Okui',
      owner: 'happyamy2016',
      review_body: "We couldn't find the werewolf!",
      review_img_url: 'https://images.pexels.com/photos/5350049/pexels-photo-5350049.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 5
    },
    {
      review_id: 5,
      title: 'A truly Quacking Game; Quacks of Quedlinburg',
      category: 'push-your-luck',
      designer: 'Wolfgang Warsch',
      owner: 'happyamy2016',
      review_body: "Ever wish you could try your hand at mixing potions? Quacks of Quedlinburg will have you mixing up a homebrew like no other. Each player buys different ingredients (chips) that are drawn at random to reach the most points, but watch out, you'd better not let your cauldrom explode.",
      review_img_url: 'https://images.pexels.com/photos/279321/pexels-photo-279321.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 10
    },
    {
      review_id: 6,
      title: 'Build you own tour de Yorkshire',
      category: 'deck-building',
      designer: 'Asger Harding Granerud',
      owner: 'cooljmessy',
      review_body: 'Cold rain pours on the faces of your team of cyclists, you pulled to the front of the pack early and now your taking on exhaustion cards like there is not tomorrow, you think there are about 2 hands left until you cross the finish line, will you draw enough from your deck to cross before the other team shoot passed? Flamee Rouge is a Racing deck management game where you carefully manage your deck in order to cross the line before your opponents, cyclist can fall slyly behind front runners in their slipstreams to save precious energy for the prefect moment to burst into the lead ',
      review_img_url: 'https://images.pexels.com/photos/258045/pexels-photo-258045.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 10
    },
    {
      review_id: 7,
      title: "That's just what an evil person would say!",
      category: 'hidden-roles',
      designer: 'Fiona Lohoar',
      owner: 'happyamy2016',
      review_body: "If you've ever wanted to accuse your siblings, cousins or friends of being part of a plot to murder everyone whilst secretly choosing which one of them should get the chop next - this is the boardgame for you. Buyer beware: once you gain a reputation for being able to lie with a stone face about being the secret killer you may never lose it.",
      review_img_url: 'https://images.pexels.com/photos/220057/pexels-photo-220057.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:01:41.251Z",
      votes: 8
    },
    {
      review_id: 8,
      title: "Scythe; you're gonna need a bigger table!",
      category: 'engine-building',
      designer: 'Jamey Stegmaier',
      owner: 'grumpy19',
      review_body: 'Spend 30 minutes just setting up all of the boards (!) meeple and decks, just to forget how to play. Scythe can be a lengthy game but really packs a punch if you put the time in. With beautiful artwork, countless scenarios and clever game mechanics, this board game is a must for any board game fanatic; just make sure you explain ALL the rules before you start playing with first timers or you may find they bring it up again and again.',
      review_img_url: 'https://images.pexels.com/photos/4200740/pexels-photo-4200740.jpeg?w=700&h=700',
      created_at: "2021-01-22T10:37:04.839Z",
      votes: 100
    },
    {
      review_id: 9,
      title: "Settlers of Catan: Don't Settle For Less",
      category: 'strategy',
      designer: 'Klaus Teuber',
      owner: 'tickle122',
      review_body: 'You have stumbled across an uncharted island rich in natural resources, but you are not alone; other adventurers have come ashore too, and the race to settle the island of Catan has begun! Whether you exert military force, build a road to rival the Great Wall, trade goods with ships from the outside world, or some combination of all three, the aim is the same: to dominate the island. Will you prevail? Proceed strategically, trade wisely, and may the odds be in favour.',
      review_img_url: 'https://images.pexels.com/photos/1153929/pexels-photo-1153929.jpeg?w=700&h=700',
      created_at: "1970-01-10T02:08:38.400Z",
      votes: 16
    },
    {
      review_id: 10,
      title: 'Super Rhino Hero',
      category: 'dexterity',
      designer: 'Gamey McGameface',
      owner: 'jessjelly',
      review_body: 'Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur duis ullamco labore ipsum nisi voluptate nulla eu veniam. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Cillum aliquip quis aute enim anim ex laborum officia. Aliqua magna elit reprehenderit Lorem elit non laboris irure qui aliquip ad proident. Qui enim mollit Lorem labore eiusmod',
      review_img_url: 'https://images.pexels.com/photos/4691579/pexels-photo-4691579.jpeg?w=700&h=700',
      created_at: "2021-01-22T11:35:50.936Z",
      votes: 7
    },
    {
      review_id: 11,
      title: 'Proident tempor et.',
      category: 'engine-building',
      designer: 'Seymour Buttz',
      owner: 'grumpy19',
      review_body: 'Labore occaecat sunt qui commodo anim anim aliqua adipisicing aliquip fugiat. Ad in ipsum incididunt esse amet deserunt aliqua exercitation occaecat nostrud irure labore ipsum. Culpa tempor non voluptate reprehenderit deserunt pariatur cupidatat aliqua adipisicing. Nostrud labore dolor fugiat sint consequat excepteur dolore irure eu. Anim ex adipisicing magna deserunt enim fugiat do nulla officia sint. Ex tempor ut aliquip exercitation eiusmod. Excepteur deserunt officia voluptate sunt aliqua esse deserunt velit. In id non proident veniam ipsum id in consequat duis ipsum et incididunt. Qui cupidatat ea deserunt magna proident nisi nulla eiusmod aliquip magna deserunt fugiat fugiat incididunt. Laboris nisi velit mollit ullamco deserunt eiusmod deserunt ea dolore veniam.',
      review_img_url: 'https://images.pexels.com/photos/6333891/pexels-photo-6333891.jpeg?w=700&h=700',
      created_at: "2021-01-07T09:06:08.077Z",
      votes: 5
    },
    {
      review_id: 12,
      title: 'Occaecat consequat officia in quis commodo.',
      category: 'roll-and-write',
      designer: 'Ollie Tabooger',
      owner: 'happyamy2016',
      review_body: 'Fugiat fugiat enim officia laborum quis. Aliquip laboris non nulla nostrud magna exercitation in ullamco aute laborum cillum nisi sint. Culpa excepteur aute cillum minim magna fugiat culpa adipisicing eiusmod laborum ipsum fugiat quis. Mollit consectetur amet sunt ex amet tempor magna consequat dolore cillum adipisicing. Proident est sunt amet ipsum magna proident fugiat deserunt mollit officia magna ea pariatur. Ullamco proident in nostrud pariatur. Minim consequat pariatur id pariatur adipisicing.',
      review_img_url: 'https://images.pexels.com/photos/6333934/pexels-photo-6333934.jpeg?w=700&h=700',
      created_at: "2020-09-13T14:19:28.077Z",
      votes: 8
    },
    {
      review_id: 13,
      title: "Kerplunk; Don't lose your marbles",
      category: 'dexterity',
      designer: 'Avery Wunzboogerz',
      owner: 'tickle122',
      review_body: "Don't underestimate the tension and supsense that can be brought on with a round of Kerplunk! You'll feel the rush and thrill of not disturbing the stack of marbles, and probably utter curse words when you draw the wrong straw. Fanily friendly, and not just for kids! ",
      review_img_url: 'https://images.pexels.com/photos/411207/pexels-photo-411207.jpeg?w=700&h=700',
      created_at: "2021-01-25T11:16:54.963Z",
      votes: 9
    },
    {
      review_id: 14,
      title: 'Velit tempor ullamco amet ipsum dolor voluptate.',
      category: 'hidden-roles',
      designer: 'Don Keigh',
      owner: 'cooljmessy',
      review_body: 'Nostrud anim cupidatat incididunt officia cupidatat magna. Cillum commodo voluptate laboris id incididunt esse elit ipsum consectetur non elit elit magna. Aliquip sint amet eiusmod magna. Fugiat non ut ex eiusmod elit. Esse anim irure laborum aute ut ad reprehenderit. Veniam laboris dolore mollit mollit in. Cillum in aliquip adipisicing ipsum et dolor veniam qui ut ullamco aliquip in. Dolor fugiat elit laborum elit cupidatat aute qui nostrud. Duis incididunt ea nostrud minim consequat. Reprehenderit mollit cupidatat do culpa aliqua culpa mollit minim eiusmod. Deserunt occaecat ipsum ex ut pariatur eu veniam cillum nulla ex nostrud. Do nostrud amet duis proident nostrud eiusmod occaecat reprehenderit. Quis et cupidatat tempor qui dolor id veniam in sunt ipsum eiusmod. Sint tempor commodo consectetur mollit proident culpa nulla est tempor ullamco tempor aliquip laboris.',
      review_img_url: 'https://images.pexels.com/photos/8111357/pexels-photo-8111357.jpeg?w=700&h=700',
      created_at: "2021-02-05T11:27:26.563Z",
      votes: 3
    },
    {
      review_id: 15,
      title: "Scrobble, no that's not a typo",
      category: 'strategy',
      designer: 'Word Smith',
      owner: 'jessjelly',
      review_body: `You know; the one that looks a lot like Scrabble, and plays a lot like Scrabble, but you have to push the letter tiles out of cardboard becasue that makes it more "fun"...  If you're a fan of words you'll love this game regardless, but if you're a hard core word nerd you probably have the original anyway.`,
      review_img_url: 'https://images.pexels.com/photos/8205368/pexels-photo-8205368.jpeg?w=700&h=700',
      created_at: "2021-01-22T11:35:05.936Z",
      votes: 1
    },
    {
      review_id: 16,
      title: 'Ticket To Ride',
      category: 'deck-building',
      designer: 'Alan R. Moon',
      owner: 'weegembump',
      review_body: 'Choo-chooing onto game tables and zooming its way to becoming a modern classic. Ticket To Ride is rich with trains, tickets and tactics. Players gather train cards to enable then to build routes across a North American map, joining big cities and trying not to get blocked by their opponent ',
      review_img_url: 'https://images.pexels.com/photos/4691567/pexels-photo-4691567.jpeg?w=700&h=700',
      created_at: "2021-01-22T11:05:05.936Z",
      votes: 1
    },
    {
      review_id: 17,
      title: 'Nova Luna; Freak out in a moonage daydream, oh yeah!',
      category: 'strategy',
      designer: 'Uwe Rosenburg',
      owner: 'tickle122',
      review_body: "Loosely based around the phases of the moon, this tile placing game is rich in strategy anf makes great use of non-standard turn taking. Nova Luna was one of my favourite nominations for the prestigious Kennerspiel des Jahres in 2020. Sadly it didn't take home the title, but its an intruguing abstract game, certainly one to add to your game shelf.",
      review_img_url: 'https://images.pexels.com/photos/279321/pexels-photo-279321.jpeg?w=700&h=700',
      created_at: "1970-01-10T01:56:38.400Z",
      votes: 6
    },
    {
      review_id: 18,
      title: 'Reef',
      category: 'strategy',
      designer: 'Emerson Matsuuchi',
      owner: 'tickle122',
      review_body: 'This game reminds me of the stress-free environment described in a song sung by a crab in the famous film about a mermaid. Plenty of coral collecting, and reef building to keep you entertained ',
      review_img_url: 'https://images.pexels.com/photos/6333894/pexels-photo-6333894.jpeg?w=700&h=700',
      created_at: "1970-01-10T01:56:38.400Z",
      votes: 6
    },
    {
      review_id: 19,
      title: 'Twister',
      category: 'roll-and-write',
      designer: 'Chuck Foley',
      owner: 'happyamy2016',
      review_body: 'Fugiat fugiat enim officia laborum quis. Aliquip laboris non nulla nostrud magna exercitation in ullamco aute laborum cillum nisi sint. Culpa excepteur aute cillum minim magna fugiat culpa adipisicing eiusmod laborum ipsum fugiat quis. Mollit consectetur amet sunt ex amet tempor magna consequat dolore cillum adipisicing. Proident est sunt amet ipsum magna proident fugiat deserunt mollit officia magna ea pariatur. Ullamco proident in nostrud pariatur. Minim consequat pariatur id pariatur adipisicing.',
      review_img_url: 'https://images.pexels.com/photos/6630813/pexels-photo-6630813.jpeg?w=700&h=700',
      created_at: "2020-09-13T14:19:28.077Z",
      votes: 8
    },
    {
      review_id: 20,
      title: 'Monopoly',
      category: 'strategy',
      designer: 'Uncredited',
      owner: 'grumpy19',
      review_body: 'This household classic needs no introduction. Monopoly has been causeing family fallouts for close to 90 years. With numerous special editions and no doubt more still to come almost everyone has played this game, but has anyone ever finished it?',
      review_img_url: 'https://images.pexels.com/photos/4792379/pexels-photo-4792379.jpeg?w=700&h=700',
      created_at: "2020-09-13T14:14:20.877Z",
      votes: 3
    },
    {
      review_id: 21,
      title: 'Ganz Schon Clever',
      category: 'roll-and-write',
      designer: 'Wolfgang Warsch',
      owner: 'happyamy2016',
      review_body: `The title translates to "that's so clever" and it won't take you long to realise why. Ganz Schon Clever is a really engagind roll-and-write where you'll try to collect score points from coloured dice. Sounds simple, but the real strategy of this game lies in how you collect the bonuses.`,
      review_img_url: 'https://images.pexels.com/photos/516114/pexels-photo-516114.jpeg?w=700&h=700',
      created_at: "2020-09-13T14:19:28.077Z",
      votes: 8
    },
    {
      review_id: 22,
      title: 'Yahtzee',
      category: 'roll-and-write',
      designer: 'Edwin S. Lowe',
      owner: 'grumpy19',
      review_body: `Often thought of as the ultimate roll-and-write game, You'll find it hard to overlook Yahtzee's appeal. Yahtzee is quick to teach and quick to play. Think of it as an essential "palate-cleanser" game to have in your store cupboard for those times when chunkier games leave a bitter taste in players mouths.`,
      review_img_url: 'https://images.pexels.com/photos/3956552/pexels-photo-3956552.jpeg?w=700&h=700',
      created_at: "2020-09-13T14:19:20.077Z",
      votes: 18
    },
    {
      review_id: 23,
      title: 'Escape The Dark Castle',
      category: 'push-your-luck',
      designer: 'Alex Crispin,',
      owner: 'jessjelly',
      review_body: 'Escape the Dark Castle is a cooperative board game than will bring back feelings of eighties nostalgia. Released in 2017, its already well on its way to being a cult classic. Filled with dark traps, dungeons and monsterous foes the aim of the game is simple, escape!',
      review_img_url: 'https://images.pexels.com/photos/5439508/pexels-photo-5439508.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:09:05.410Z",
      votes: 18
    },
    {
      review_id: 24,
      title: 'Escape The Dark Sector',
      category: 'push-your-luck',
      designer: 'Alex Crispin,',
      owner: 'jessjelly',
      review_body: "Argueably one of the best things to come out of 2020, and new addition to what will hopefully become more than a two part series. Escape the Dark Sector takes everything about Escape the Dark Castle that made it wonderful, and then adds guns! Thrust into the future by the imersive chapter cards, your mission remains the same, (thats right, escape!) but the challenges you'll face feel a whole lot more grown up. Cooperative and atmospheric, Escape the Dark Sector brings more variety and a bigger challenge to players. Don't underestimate the dabger of running out of ammo.",
      review_img_url: 'https://images.pexels.com/photos/3910141/pexels-photo-3910141.jpeg?w=700&h=700',
      created_at: "2021-01-18T10:09:05.610Z",
      votes: 11
    }
]

const comments = [
    {
      comment_id: 1,
      body: 'I loved this game too!',
      review_id: 2,
      author: 'happyamy2016',
      votes: 16,
      created_at: "2017-11-22T12:36:03.389Z"
    },
    {
      comment_id: 2,
      body: 'My dog loved this game too!',
      review_id: 4,
      author: 'tickle122',
      votes: 3,
      created_at: "2021-01-18T10:09:05.410Z"
    },
    {
      comment_id: 3,
      body: "I didn't know dogs could play games",
      review_id: 4,
      author: 'weegembump',
      votes: 10,
      created_at: "2021-01-18T10:09:48.110Z"
    },
    {
      comment_id: 4,
      body: 'EPIC board game!',
      review_id: 2,
      author: 'tickle122',
      votes: 16,
      created_at: "2017-11-22T12:36:03.389Z"
    },
    {
      comment_id: 5,
      body: 'Now this is a story all about how, board games turned my life upside down',
      review_id: 20,
      author: 'cooljmessy',
      votes: 13,
      created_at: "2021-01-18T10:24:05.410Z"
    },
    {
      comment_id: 6,
      body: 'Not sure about dogs, but my cat likes to get involved with board games, the boxes are their particular favourite',
      review_id: 4,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T19:49:48.110Z"
    },
    {
      comment_id: 7,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 8,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 8,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 7,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 9,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis.',
      review_id: 6,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 10,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.',
      review_id: 2,
      author: 'grumpy19',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 11,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim.',
      review_id: 4,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.110Z"
    },
    {
      comment_id: 12,
      body: 'Aliquip aliqua ad fugiat anim ex elit consectetur ut fugiat ex qui.',
      review_id: 5,
      author: 'tickle122',
      votes: 8,
      created_at: "2021-03-27T14:15:51.110Z"
    },
    {
      comment_id: 13,
      body: 'Sint elit ut ex aliquip laboris in elit Lorem elit incididunt cillum fugiat.',
      review_id: 6,
      author: 'weegembump',
      votes: 8,
      created_at: "1975-02-15T08:22:39.110Z"
    },
    {
      comment_id: 14,
      body: 'Commodo et non ut aute anim nisi occaecat ea veniam ut ad.',
      review_id: 7,
      author: 'jessjelly',
      votes: 15,
      created_at: "2021-01-22T11:12:02.734Z"
    },
    {
      comment_id: 15,
      body: 'Ex aliqua irure elit aliqua in veniam ex ut pariatur nulla.',
      review_id: 19,
      author: 'tickle122',
      votes: 1,
      created_at: "2021-08-26T19:39:28.077Z"
    },
    {
      comment_id: 16,
      body: 'Duis anim aliqua consequat mollit ullamco fugiat qui mollit minim proident.',
      review_id: 9,
      author: 'cooljmessy',
      votes: 2,
      created_at: "2021-01-22T11:49:52.508Z"
    },
    {
      comment_id: 17,
      body: 'Nostrud adipisicing reprehenderit adipisicing velit do do quis do veniam ut adipisicing aliqua do reprehenderit.',
      review_id: 9,
      author: 'weegembump',
      votes: 10,
      created_at: "2021-01-22T11:50:24.771Z"
    },
    {
      comment_id: 18,
      body: 'Reprehenderit ipsum eiusmod sint amet veniam ex veniam cillum quis et Lorem mollit dolor ipsum.',
      review_id: 12,
      author: 'grumpy19',
      votes: 7,
      created_at: "2021-05-03T01:52:48.077Z"
    },
    {
      comment_id: 19,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 3,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 20,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 3,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 21,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis.',
      review_id: 3,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 22,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.',
      review_id: 3,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 23,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim.',
      review_id: 3,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.110Z"
    },
    {
      comment_id: 24,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.',
      review_id: 10,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 25,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim.',
      review_id: 10,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.110Z"
    },
    {
      comment_id: 26,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 13,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 27,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 13,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 28,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis.',
      review_id: 13,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 29,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim.',
      review_id: 15,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 30,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim.',
      review_id: 15,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.110Z"
    },
    {
      comment_id: 31,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 16,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 32,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 16,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 33,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis. Ffugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat?',
      review_id: 16,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 34,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim. Fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat.',
      review_id: 16,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 35,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim. Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur.',
      review_id: 16,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.310Z"
    },
    {
      comment_id: 36,
      body: 'Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Quis duis mollit ad enim deserunt.',
      review_id: 16,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.190Z"
    },
    {
      comment_id: 37,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip?',
      review_id: 16,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.180Z"
    },
    {
      comment_id: 38,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 17,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 39,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 17,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 40,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis. Ffugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat?',
      review_id: 17,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 41,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim. Fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat.',
      review_id: 18,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 42,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim. Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur.',
      review_id: 18,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.310Z"
    },
    {
      comment_id: 43,
      body: 'Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Quis duis mollit ad enim deserunt.',
      review_id: 18,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.190Z"
    },
    {
      comment_id: 44,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip?',
      review_id: 18,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.180Z"
    },
    {
      comment_id: 45,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 19,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 46,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 20,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 47,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis. Ffugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat?',
      review_id: 21,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 48,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim. Fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat.',
      review_id: 21,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 49,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim. Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur.',
      review_id: 22,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.310Z"
    },
    {
      comment_id: 50,
      body: 'Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Quis duis mollit ad enim deserunt.',
      review_id: 22,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.190Z"
    },
    {
      comment_id: 51,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip?',
      review_id: 22,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.180Z"
    },
    {
      comment_id: 52,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 23,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 53,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 23,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 54,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis. Ffugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat?',
      review_id: 24,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    },
    {
      comment_id: 55,
      body: 'Ex id ipsum dolore non cillum anim sint duis nisi anim deserunt nisi minim. Fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat.',
      review_id: 24,
      author: 'jessjelly',
      votes: 9,
      created_at: "2021-03-27T14:15:31.110Z"
    },
    {
      comment_id: 56,
      body: 'Commodo aliquip sunt commodo elit in esse velit laborum cupidatat anim. Consequat velit occaecat voluptate do. Dolor pariatur fugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat et adipisicing laborum do. Sint sit tempor officia pariatur.',
      review_id: 24,
      author: 'happyamy2016',
      votes: 10,
      created_at: "2021-03-27T14:15:21.310Z"
    },
    {
      comment_id: 57,
      body: 'Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip. Quis duis mollit ad enim deserunt.',
      review_id: 24,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.190Z"
    },
    {
      comment_id: 58,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim. Et do ad id dolore id cillum non non culpa. Cillum mollit dolor dolore excepteur aliquip?',
      review_id: 24,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.180Z"
    },
    {
      comment_id: 59,
      body: 'Quis duis mollit ad enim deserunt.',
      review_id: 1,
      author: 'jessjelly',
      votes: 3,
      created_at: "2021-03-27T19:48:58.110Z"
    },
    {
      comment_id: 60,
      body: 'Laboris nostrud ea ex occaecat aute quis consectetur anim.',
      review_id: 1,
      author: 'cooljmessy',
      votes: 17,
      created_at: "2021-03-27T14:15:38.110Z"
    },
    {
      comment_id: 61,
      body: 'Consequat nisi dolor nulla esse sunt eu ipsum laborum deserunt duis. Ffugiat sint et proident ex do consequat est. Nisi minim laboris mollit cupidatat?',
      review_id: 1,
      author: 'weegembump',
      votes: 1,
      created_at: "2021-03-27T14:15:36.110Z"
    }
]

describe ("countComments", () => {
    test("Does not modify inputs", () => {
        const input = [...reviews]
        const inputComments = [...comments]
        countComments(input, comments)
        expect(input).toEqual(reviews)
        
        const input2 = reviews
        const output2 = countComments(input2, comments)
        expect(output2).not.toBe(reviews)
        expect(inputComments).toEqual(comments)

    })
    test("adds comments_count property to review object", () => {
        const output = countComments(reviews, comments) 
        expect(output.length).toBe(24)
        output.forEach((review) => {
            expect(review.hasOwnProperty("comment_count")).toBeTruthy()
            expect(typeof review.comment_count).toBe("number")
        })
    })
    test("correctly tallies reviews", () => {
        const review =     [{
            review_id: 1,
            title: 'Culture a Love of Agriculture With Agricola',
            category: 'strategy',
            designer: 'Uwe Rosenberg',
            owner: 'tickle122',
            review_body: "You could sum up Agricola with the simple phrase 'Farmyard Fun' but the mechanics and game play add so much more than that. You'll find yourself torn between breeding pigs, or sowing crops. Its joyeous and rewarding and it makes you think of time spent outside, which is much harder to do these days!",
            review_img_url: 'https://images.pexels.com/photos/974314/pexels-photo-974314.jpeg?w=700&h=700',
            created_at: "2021-01-18T10:00:20.514Z",
            votes: 1
        }]
        const twoComments = [    {
            comment_id: 1,
            body: 'I loved this game too!',
            review_id: 1,
            author: 'happyamy2016',
            votes: 16,
            created_at: "2017-11-22T12:36:03.389Z"
          },
          {
            comment_id: 2,
            body: 'My dog loved this game too!',
            review_id: 1,
            author: 'tickle122',
            votes: 3,
            created_at: "2021-01-18T10:09:05.410Z"
        }]
        const output = countComments(review, twoComments)
        expect(output[0].comment_count).toBe(2)
       
    })
})