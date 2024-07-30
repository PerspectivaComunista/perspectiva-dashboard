const { getFirestore } = require('firebase-admin/firestore');
const { firebaseServerApp } = require('@/lib/firebase/server');

const products = [
	{
		id: '1NzEcfvCaenk1XADqrBo',
		name: 'Nausolvit',
		description: 'De primă intenție în eliminarea disconfortului provocat de greață și vărsături.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/1NzEcfvCaenk1XADqrBo-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=A5gMQVA86MfUpKKwF8v0r25o6M91Z83SFQkY9s%2F6GkKfDoas8GW%2FOu9eJ4sko94vnj7V3pCGKNeoZ7c1FP6BOukL3%2BQzbCJ88CV4ttg%2BFt6siwWW8EOigdFTb3ci0cPkp3fKeDQspZS8qsOjxVA724%2BMrDEowydnqO8eNpVRBEHBt08eCJI2iMcqjDodtw5PVNJNrHerYjGcA6KGC44XWdxe5SK3RpTkPqSIuaQXnzWt6KdKS5qTOGxVqRieKp41pj%2Fk4ugCBWXt6upYW3y4XC%2F4En8kY7IRXt%2FYsUfKAHcErZrDSQ%2BsVqrMjR9AHyFAkS8xhy%2BJwgjw%2FrAjc1%2F57Q%3D%3D',
	},
	{
		id: '5tqhYGrFiRN7yDcHSgSR',
		name: 'Rehisol Plus',
		description:
			'De primă intenție în profilaxia și tratamentul deshidratării ușoare sau moderate, cu eficiență clinică dovedită.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/5tqhYGrFiRN7yDcHSgSR-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=lqQsQyzUWYEzIiMD14uFAfQfAAxuD6bRvPPcl6fpP%2Bdbogs0SxrEHDz9DzKv%2FmC7HhKcKL0mSUpNZGyKdTTkLKShfQd15YwdwTB346GiQsigP94X8vFmgQ4bEmLvUtoV53tOSXSM%2Bvys4Ao%2BsG2veNA2YQgT%2BIdtE6T81aPGKcFYmNB2Xx6WFTU2%2BvFo4VwjGn5XVBTGLR0gYtDJNq4c7AT6TT06fEaSbLz0Nt0ga5x6I1My5YkMqGbmlfBSGGFmjtxFzF5Y6WYKkt6ju0eBmrSjAdyWqCgy%2FtOw585a5ibBXMZWQEdf3Of0hXg2YrY0eNKMDdm7ysEWAv6enybYRA%3D%3D',
	},
	{
		id: '7kTZWcz92VBd4Dqm8N3S',
		name: 'Frutdep IMMUNO',
		description: 'De primă intenție în profilaxia și tratamentul infecțiilor respiratorii și al recurențelor',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/7kTZWcz92VBd4Dqm8N3S-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=sWhHzLLd767yuEU4AlO27VsODGLesmsxbvMxs4byb%2BkNnwyVMsGidqUH8alTb7MitTtyuPK1EDZpNwa2h3cEI08hkrLP%2FvwvBMS79Q4M4IUlWHN33AdxNBCCveHu39gA%2FDEeyhH%2FIyS7B8hfbB659rc%2BQCXxllTQdBxRZ70xaH8rnKYxIj0UZ2rj54MaPNLkxdskReYjJ8JpAGmEoz67SZnFBAeL%2FQivwRa1OHhYf7fiYwDieb4exajOWaI%2Bm16HIZ%2Bptol9Yicmxx7b%2F3XQ8Dde7xPmRpX9BYEIAzIsbkPF%2Fhs%2BPIQQVwMKdt2Y9SNWQQz3SSPHoVZeOjDogTHSKQ%3D%3D',
	},
	{
		id: '7shyEDjqET2FLm7lG11J',
		name: 'Ansiodep',
		description: 'De primă intenție pentru calmarea stărilor de agitație a sugarilor și copiilor hiperactivi.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/7shyEDjqET2FLm7lG11J-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=gx0QPPpnXfGa3CffnsZckOvuUxc3GqSPvBYAdqIFGps9XZjTkATQK5pHUYcpMR0OtGL1auDYSDAqNtztlTfgq4ZONWLnNZt0Ehmr4Oc8pxFQUHkdYVKNTXNhBjOCGTZSh%2FRcsrURGD536PvQKKVPZqiD7XxNj07a93l0ICjujLJHDAxouSHCI3LkQo8t%2BweDG6CCyta9mjjiceexc8FaRGR5QlKiiTW5gABiIROdGDR9dwMgTGeCumItfnSkdrlLBCGVkEItZ6Gzm56tw3bJ7%2B4Z0AQOQm%2Bx4d6%2BoKCvnnC2mLQ85y2jUhGCJ3TjdXw97ubnhUJ6fgZVF6F2WDmlhw%3D%3D',
	},
	{
		id: 'BImJhdAsMA9msy0einuA',
		name: 'Laridep comprimate',
		description: 'De primă intenţie la primul semn al inflamaţiei mucoasei orofaringiene.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/BImJhdAsMA9msy0einuA-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=NodQ9d9LhETJJgq64f1uH4C1PQYYsN6wxoxWlihCKZ6vpVAOmv6JQboPNn3qNdtZFquDySc4ObTZCYG4sOk%2F3D%2F9pJh3EgnlWoHqyRyx8Indk0t0IUyJsspv6ovQ2jawfvbCBG9ovX%2BVTGdUg1BhTePo1kl%2Fe9e1a1abMfAXgRGORE0Ks7W33RH1VPFOtqQStY9HL4DQySV55LOXFnTrjhoqJfTT65Wrnia67j1JkU5mhcvWBrYm%2FBj0dVOBbjkT%2F6qLfRiVc6r7Vgx11%2Fjm2jF49AWlNlL%2FVsjSRvMhYSp1WxYOP8%2B6tzoKrJHGDhlKMJh5HwoAWNlTqe0JPdBe9A%3D%3D',
	},
	{
		id: 'Lb2lhHMfVEXPyhOIQe3j',
		name: 'Rinodep',
		description:
			'De primă intenție în tratamentul rinitei, combătând natural congestia nazală și prevenind apariția complicațiilor bacteriene',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/Lb2lhHMfVEXPyhOIQe3j-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=lNUOlNdHDmEruxqAyGgNfhYFPsXvBWuGClr8u6JQRY%2F6xupF4MNXXInl50U6UEHggeqYnKDOAl7JA0Ii0b%2FRrOwvVDqVmkX6jb5Gzv19Mt4XIwXFvwdZddcZMoKZz6eUeWNmteGLuk%2FuuEvnCrx9pLSy1dLeiXkAW9BMaR90dJxxaDYDHLJJAi07AqC89eOrsHIB1GCq9bDRTgGdJLpN4M8mnXp1P%2F2O0FelLTDfwVuEMMXJUZ9eVTBXEIDaU2IUhufPguzl9hgYvSIlYyYcZzgzmuGK2zy93rsqtX%2F0USzL1n3TINENtKUyL1HUZnK3xTedWP9qXUrhI6xOIe%2FKqA%3D%3D',
	},
	{
		id: 'NJjjkpjSklBktbMDPstX',
		name: 'Acnedep',
		description: 'Formulă special concepută pentru îngrijirea tenului predispus la acnee',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/NJjjkpjSklBktbMDPstX-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=uknxzs%2FLDYnUmAOLendzzV1AjQWsnzly3Avwgj9GNVMSRmF%2BoYU7DWOzk5Sfe6nmfru3VMBx3meQyrL2Rla5DGXZnsToDD4AXZboKl98WvZcamaieuMm0SQMx03iKZ1PkelrEu8kFcSGLnMTVFbHeguCisaw0nEs8ab9xfaTOMnESkEw8SItIHBTh71wpUyo9E%2BrJBl0bB6qG1Zx9mS0i0TB0a5FFrDdJzjmITfPjgeScjEDVJloFnO1zQuTI4D1PUpQbZZn8pZXg%2BaByz%2BIz4TgG7ozsmN7bd%2Fqq0JDM61bCtPXmF7ALXN44rmmJ8bbt2N7Lm3D4l2pQQ0hJaAfsw%3D%3D',
	},
	{
		id: 'NTRBEgRJsS8YCGxG3FDU',
		name: 'Laridep Spray',
		description: 'De primă intenţie la primul semn al inflamaţiei mucoasei orofaringiene.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/NTRBEgRJsS8YCGxG3FDU-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=ima0piLEjbayeS4R2TmNzkuGwz%2Blvl11HnspvgTvXsK8iv5IMAJYBlv8it92IKazPafenB8BRzrzMLqw6AT1HwDAozCRRpd8Isng8KclWe6csOOqB%2BiA7FPBaG%2FrlJ%2FNRQDB2%2BtOUvpbkvJLWIs8JDWe6S5azg40ylDojfX5GF0TSpoGk5AX5QZtL%2BNN1Sm2IinsiLBAwLQJwu3GabYH2DTk1u6DZ07RburD0SwJDdPDTnQXixk%2FCnNJdjMYz%2Ff0uUeiS%2FmreSWjSvxH4O1JTH%2B2TgF6SKLMIRtV6CAmSNQzHpFgRofhIkbK7dTAPq2rzfvPIDUdkob51vHaEkLulQ%3D%3D',
	},
	{
		id: 'SoY3ElkoUMl8JbmBvL93',
		name: 'Ferrodep',
		description: 'De primă intenție în profilaxia și corectarea anemiei feriprive.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/SoY3ElkoUMl8JbmBvL93-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=bUHxwr8jkcwNQe1II2QRTufMSdPUuCnClW4VQ2O2%2Fnku1Y1H4eihkjOGAmEhKjEMkYKD%2Bwb3pcAL1dapSGPeHb38qei3igakTu9OUtZ6bB84LLoW5MgUi8ctIxAGW66DwD7HJEnQ4px5BR0cVX3sniLSCkX1ngOieceOidCFZcj0pKklcyra9DcOkppgBYnWBcm02jTs8tQXLryou4rUOnTJwwQIswx5HnZ7p%2F%2F0hVK%2FdLvM%2BmeXT9rflMIQ9zgTyhoSZz598foI9lcTp6iKV3H18dYouvNu8KpSLNqJzLBTiQMI2qEknekQWvzEJ5YJSuW8g9sqkvqkT4KDjYSEHg%3D%3D',
	},
	{
		id: 'TnNu90sA3AkpUVxYGfSY',
		name: 'Fortimmuno capsule',
		description: 'Formulă special concepută pentru susținerea funcționării normale a sistemului imunitar.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/TnNu90sA3AkpUVxYGfSY-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=UK0RRFGShppL1Gu7sAeRKBYFVmZfOKZhKb3%2Brf5AMLQRJiplNXJ7diMSgaQjS3wTyBuW6pfyhMK9poD0IQcePZsgsVwDGMm3g7sPhncgYa8M49NMkF%2FiCB9gOI8oKy5OibQrwDuYLvyuw1Xa6SYeaPbwmD3xaspfwsL9lezjDL7mATUS2IMMUsqid7cXb0Ed%2BEjq%2BiLfM3t%2FihEjt%2FqM93FmKNb6jAELWTef5csSYWkvcC8UHhfiSHPFwGHBrnTX%2F6YScT5I5Yp9Mefj2jvD8mxpLaM4oUCUG3crpHj0h2Tb1n%2F0891oVkZMVc%2BAVOnAdUNLiyG4LBob1rua7Bo78g%3D%3D',
	},
	{
		id: 'UrYNBm7agR49qTAk072f',
		name: 'Dermadep Crema',
		description: 'Formulă special concepută pentru îngrijirea pielii nou-născuților, copiilor și adulților.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/UrYNBm7agR49qTAk072f-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=GWorl4yDPmpAoy3FZZQpkCWLm3bzGCGJPArvZfJOVYDxsjx31wi0jiprtyisSqseeHgBv6X28r57%2F91KkMb8Zk8vT4jMwFwNwC4Frz4SswBUPkeO6lFGywB4EqY6UyEVaGOjfEfjA8w11flszyyn6N%2B8YR7ms2ajE3BGHPranWj4GUuP5uXbQpxugIp%2Fei0NBUpL2J3Fmxfsf0DuYpLFVM0vTRpYScWdVVRh8n%2Fz1DSIVF1NkGyEkzGvn8j5dhEPOCAANms1CeONjZQyQeoz%2FQOAHhPeSKp4m6J8AL8trgvq13pIycLXUEqL6RxH6x%2FrTDDrhiO5HlOiKVFFyTgh3g%3D%3D',
	},
	{
		id: 'VN5NUTd0IScrZ2bdw2R5',
		name: 'Virodep comprimate',
		description:
			'De primă intenție de la primul semn de viroză respiratorie. Asociat cu antibiotice și simptomatice, scade durata și\r\nseveritatea infecției, grăbind vindecarea.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/VN5NUTd0IScrZ2bdw2R5-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=WGd2FFCdGNSSck%2FGB93A0w%2BIPOLtiUKaOGAWFODbfgrE3y8I865%2BIGLph3vdWO1YsUaLqUVzSkLVLyHEG2t09qHOBUDe5BYZDOk7niGQVAfonxZVugMHoX3fLQ6m2b3ZcPyyR4Moe47jxPfgw%2Fuu1YDonl6B4s8r1UkpesKMOYmAdk%2Fo8d7b84fXrm7MkiQZyfPGO7gWJ%2BxQy%2BsgKm3a7K%2F11Y2FNE8vjkzz8CrCN6rcgzB9jB%2BKIm8oWDYMSrhsp%2BSNqFmJeGv47UlAlKGzpuNtjVycDgMzwpuAnGBj1KASPBMSBRBKOWIB2hgpk6WljKVXD5mnjO9L%2B7K7LQcT%2Fw%3D%3D',
	},
	{
		id: 'YjCniDFYR7DpMwH6PXuy',
		name: 'Dermadep Sampon',
		description: 'Formulă special concepută pentru îngrijirea pielii nou-născuților, copiilor și adulților',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/YjCniDFYR7DpMwH6PXuy-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=p3%2FhkpsFbEcptJJL2%2FB%2Fdk5kNZbOlqm4N9nq8LcIK2CdTf7QC3qN2qUbzlJfxXodGPvgr09hSNPDO77ppQrlP4TN53R6KjJDFeLt4kwlXV8V6e54uF3eR8JuxKU2JCg9yCwrrz0K10%2FxgR5olN6aL4iX6K5s5anz5De0j%2BuQWW%2B%2FhBGpfXxq75QNnRARs%2FCxy3Fbcp3FCZQl9UXkDS629WkoJKcVsJnacNE4mmsjIrr%2BiAdEyuyadpp26XH8ScaS2WaAyuFMF9r2j0Ptu%2FDoavp4eTh%2FVQz0VPB4AJj46frABwOshHehu7s81WwEKZVVncL8xlgF0pIKGFFMewpYMA%3D%3D',
	},
	{
		id: 'baTOkRjkNqydM5Uxc1Cw',
		name: 'Hepadep',
		description:
			'De primă intenție în susținerea funcțieihepatice, reducând riscul de citoliză hepatică indusă medicamentos.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/baTOkRjkNqydM5Uxc1Cw-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=Ollg0P06JRXop2FQZ12JNkQPRXBsSKDURqSp9Y8uz4L1N5s5OrYNzDUgjEe55UnM%2BoWEaVMShqTg86gb84qw1N47Htw3DjvgsfPVAYU%2BMxi39UQ1x30NiJjinQxW4mVtk9XDD6I87CyYCqQcNGsmJsIe0wlpvGjwoGJBi%2FL5mdb6SbddU9QNcIZldIa9qs4sWxCbCROu3eNJOc5owbCp0bIS5xMhETuxGG6Np%2FN4WF%2BIVN4FQ%2B0up%2BaeZ2g7BifFI2VpWiqTstBCboOLHNocCPPBNCzeEJx1IZ1UNjep8cnQwRsX2dnILiwg6tcVF9kCsGqqT5VuYGg5rgcmJVjoAQ%3D%3D',
	},
	{
		id: 'cTKjcGaDXjA6PsS7F215',
		name: 'Fortimmuno kids',
		description: 'Formulă special concepută pentru susținerea funcționării normale a sistemului imunitar.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/cTKjcGaDXjA6PsS7F215-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=p2T1462fbtv5Js1Vx%2FjKw8f8GfZOyRAbc7infhBFjmrddUQdcIyhFjzxk4BIqVVkNeArf3v2RydnQTpGoTrsneToOrmduNwsQv2CNhJCt%2BfHfzrOOlx%2B9wUtXQqYLBLcNZpR0RXyOjqiyWXzDJlYuIod%2F0FBWOhcFkro0kSYv0EC1Q4IZPGBH%2FNrCkN9X4PsGODZ%2BcDMX0CaodiIptk3I4%2Feg2UmJAqbQz1A7ppZyHSmH3GX0W8eIlAHVFRUQK%2BDnqU%2F6sjAQ21Q2qwrZZjJRKUdw8wttCAa5gE0HHG8uDthEfjksEgMx79YOTgxwvXaycDmcVU3%2B1UxU59UsY6eLw%3D%3D',
	},
	{
		id: 'eDVw06WzZ74oYEGosLUg',
		name: 'Rehisol',
		description:
			'De primă intenție în profilaxia și tratamentul deshidratării ușoare sau moderate, cu eficiență clinică dovedită.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/eDVw06WzZ74oYEGosLUg-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=GHVJUnYlAKZuNKS1CHHSfF69ZKrBoe4kp%2F5zeL6NmF19viaB7VhTlsC%2BpBfQExwHAKnmEkPij8RNaXq%2BLMuzszE37qrGpSKRCq3GPpT3ZUZdEgXvBIjqVciHt%2Ft2HbJtASJ6435xgkZeFmGgstFMekKa%2FGy97A8%2FGeyztZEVI6mkFr0EM9RjRPN7431Akd8sEcmYM2dabWWUZJc0AecYjTP8W5EikS6WIOqz3tu2gpRpuvnj15K15FvbdM9vRGIXyGDG9X%2BHxTAAILZb0RHH93BqRxF322n%2FJ9Eq3dt92oybb6do6N5k90TKuJh8cwXzS8GRYd8McrNY7NcHaGGzwA%3D%3D',
	},
	{
		id: 'f2Igx6Pvrkcry5wRuAwN',
		name: 'Spasmodep',
		description: 'De primă intenție în ameliorarea simptomelor cauzate de dispepsia funcțională.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/f2Igx6Pvrkcry5wRuAwN-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=yXCojP0bFb5xTFHRT2497ikB7apIW1K62vTxHPa0LE1WRKzhBLrWkZVSrVwkvPQqhxpdbWqEAirvMHWNxZYnPpbE%2FUMnd9g0EjihHU9cb8EdHH2RCmSs294794404OtcwZGp06S0%2FxP84Q6mgvXBFWx7mNG0ivkfWqpzuNkIKWv1iZI7TpW%2BgZuwIfVXxU2T8Ox8Ztjj%2BR4FNne45%2FHezERVquELk0FZp%2BaUhvPIYqmFxagi0gz2sXAv5lAxVGdlyuLrIMuTWH5LVRiKi%2FutNLo3Yb056%2BUPmsRUPuiY2X2hGhW28KuaHgF%2BzTmUOQc8WvXov1I0fG0srRS5k28x9A%3D%3D',
	},
	{
		id: 'fdpIrezSqLdLICOzQRTC',
		name: 'Virodep Spray',
		description:
			'De primă intenție de la primul semn de viroză respiratorie. Asociat cu antibiotice și simptomatice, scade durata și\r\nseveritatea infecției, grăbind vindecarea.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/fdpIrezSqLdLICOzQRTC-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=Bj6%2B%2FkRxqbiAP8iWgZDI2LEg%2BkCLBz4Le0fI%2BLdkmsfwn24%2FbsFkQb9LhM6J%2Fl29x6JKvV76LW8gonIvUyF06UyLflyHl4ejkdv%2BwreS%2Fx7j%2F0ScaTETiNYt5hcco16RXsJRmM2fmlpe9T74yLv8XwxfBV5pOGbhkZWL%2FDyISypUjww9fJ1ocTsnEfTfUt1L5XgpM28JVyJi5My9QeDEgsXhV7Z6d2ua85LJ3KllTXIhZjVslUASr%2FzQR8frOKKcgAPysNOU8DnVlWfCDFjTjwHxHoM2dU0A0tCXmGaqYlJATF5GyUUrtye3NBiO7ahT3TCVCVB0p9dSgugEnHj%2BCA%3D%3D',
	},
	{
		id: 'iQlgAIjfUQUy9ECGpnal',
		name: 'Laxodep',
		description:
			'De primă intenție în combaterea constipației. Combinație unică de prebiotice și fitoextracte standardizate.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/iQlgAIjfUQUy9ECGpnal-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=W0QmSmJL63hWroQfT3wbaIBZbMFLanyrA3EBVaVrWZzOdbtlkWu12yLW%2BnVn3U2CyNMsxPFa6QKijEslP4pVtJE3Ekv8mBSBmO1OMGbVEp%2BPwjeMeMjzVmLCGVbOhlykoY6r5kT0dynIWryJNXJnoDeL8XTUkJSkG9nInUF2dL%2FRAjJhkyca5riuHMuR3mKAnIq0pHORh%2Bivs8paX4UEqJh6NCs5ZYJWAK337CCRlY3Uy8vvTOu36CFrUP3%2Fvlg6dU6vv8M56yPj0VQeWvWHks8nkhbaNFVyl%2FCLkoYLpbLSC3ltuKPmuOpOAKEtq6J8efrrLsoSljTfktrra%2FXGuA%3D%3D',
	},
	{
		id: 'mgkUhBu62jTJaN14rJXm',
		name: 'Allerdep',
		description: 'De primă intenție in reducerea hiperreactivitatii bronsice si a manifestărilor alergice.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/mgkUhBu62jTJaN14rJXm-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=mcUTbYDvSj7bCCW4D1f1SiJb%2FBCtbkwme53qUiJFqAPEubx62V5rfpeVTBQ%2BEhp4izCueyzxsSMW3%2BNN2RY8HZtiGEau0oZHhdtWy0ti7Hu3ZI0%2FrgZJvsdt4cr99PnPxT1h5QJhf2hYYTVK%2B9zUGQRO3EqiVDnjfjm661aSNqH3zZmiwNmqR1vskpK%2FikV0vCuogNp3dQIdPjN%2F9alRizXtQS8XsXcc%2FNEogPcAms%2B%2BYtlIyKRvkf9uS03LY9RgxprEDKEDnemYvfH0OoC24BVSuBIZSjHftjpD%2BopUh4mwNw3N40Xh%2BENcSgLOtxnDd8T67Sw5F1NCQ2n0D4RLbg%3D%3D',
	},
	{
		id: 'n2qUVSOiko5EMgGXskL9',
		name: 'Enzysol',
		description:
			'De primă intenție în ameliorarea simptomelor cauzate de dispepsie și intoleranțe alimentare generate de deficitul enzimatic.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/n2qUVSOiko5EMgGXskL9-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=t%2FFNwJx4mbdikdUSeJu4qaJzEjfUbA3jgwME%2FfkCHxukAweVBdvz%2F1S3AP8foY9gtitkU2ToEqgCussFJvXXuyp%2BhyM0BPmXWdQsAHc05p9dHdCaLAw4y4argbzb%2FC16Mf0MMX2KHKxUUHjtlnoexobQZsjNBRkWfY0NE9fZ%2FLHrdmm%2B5BYKs0CrobrmY%2FqWv0aD09cCjaWBuK3ClIWb7pWqNk343y6yNgdpe7on%2BUWZSf363inDOmMZuBpuArs4kO2iC2EoyvWkFJriPRw1AXXfBknsZhiEyc4pge0Hg5hubWAOEwEKCa7WZGIpiuSz6qH5pL6GpxlUC2JENqLbiA%3D%3D',
	},
	{
		id: 'nvFWGPgi4Z9dRBLYUj5u',
		name: 'Tussodep',
		description: 'De primă intenție în tusea iritativă, productivă, acută și persistentă',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/nvFWGPgi4Z9dRBLYUj5u-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=BPCp4EoNTLNP1auY%2B01qiMsciL9P8H1%2Fa%2BPuxcLxG1O3AGGSELVpU07kEYSxcXnMR7%2BTFKecpM%2B4z3jTHdZKfz%2B4xB0wAiG%2FBXe7Mz1%2F2d1hWEIpF3Ru17QX%2F7CEPQ%2FTj8PbfqBKT%2FXjhtrImNUqt4t3vi0HX6RaZ46V7ZJPt2CW2gJeyKaxnNUFt9NM%2F9cTlJFSjhfpT3J%2B5UMzPNHV3a%2Fg2tDvUnfpenzuKZjV2SNJ5KsRHAeE7IayPyGydhzvWDYao1yClWr2A4fEaOBW9m1U397B%2FeWG8RYtxWOafN5AfybQPIz776kbdj2CE%2FLNATD9DENzE%2BZIpKhBAjtYLw%3D%3D',
	},
	{
		id: 'oZ43iWGvJWHQkWDiZd7K',
		name: 'Vitadep',
		description:
			'De primă intenție în profilaxia deficiențelor de vitamine în cazurile de carențe nutriționale mari, aport nutrițional insuficient sau când dieta nu este suficient de variată pentru a corespunde nevoilor nutriționale.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/oZ43iWGvJWHQkWDiZd7K-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=Ps0j7alXXArebszx146bZ9eziZAQzD5xMQ6WSWn9kh%2BPDCehc60oJUYu5LrLF8kwvAoaZp5CLrpvcCEUk2Cs%2F1VeLA3Vkm7m1V67iPOUnSe4OMyIteL3x1aRK3ZGssvA7knNbFqAv20lKggDT7psSi8RGKbAbxtYvZ3TSCWKbBxHq3rb31TC3Kr8lzdmO42ETeI1c6AUwBQBOUaS8Dnvd4xWMaWbbYjfOWelFQfRdPNnszJVMRhWUWRAYNSF541vnZHvgfUJW2JJnhgkr1R1gJwyXxoEZRhUTV8yM4IlVqSJU8bmStoV%2B2Vgecf8JWQIC50oaBAOI0JiOxGG78dGiA%3D%3D',
	},
	{
		id: 'qfohfYaG6sWc5gyvf5mc',
		name: 'Cistidep',
		description:
			'De primă intenție în profilaxia și tratamentul infecțiilor urinare, contribuind la menținerea sănătății tractului urinar',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/qfohfYaG6sWc5gyvf5mc-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=C53911UhoPVE5Br69f525FwNdKtRByNhbpQkvmgPz9pmgixUs4bhMt%2B0YJnRzOB74f%2BVAYfF1OwO372K7towC1iNP%2BEWmRgp9khqH9UCp1Qj0dcZE7Jp%2BG4%2F%2BfWU1Ud49WC5au5GHrRNpBlcr2SJauEsY%2FnXYZaqlH8Tr0rxUJ8xBu0sVJG0e4PT7PIaVGXv00w61BfyCJHcjmWx2JDPqhfYVADZXxZtyUR7u4soabMnTj95iEtwMpSWPCP8lVtQM1T%2FjnlDt4a9mzuY3hC5GcIM0oXqXOprxV%2FLekSInvaa7yLGkmVdwOGPsQXNR3paOEypZpCDWPMwqUSVXd2OkQ%3D%3D',
	},
	{
		id: 'xQX3qeYpFtpYDXHNsCxE',
		name: 'Diardep',
		description:
			'De primă intenţie în ameliorarea diareei de diverse cauze: infecţii digestive, diaree funcţională, diaree iatrogenă.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/xQX3qeYpFtpYDXHNsCxE-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=eXor461cXw0vfRxIlcATnYSfmF28GMHSS4KCwWuxZ%2FpG%2F87tlcpqh7VQsGjyvG5dsaP8zKmrhOenpvSXn42yQPhe3bO1M0aYo3LJ%2BkTUziNNy2tMGto0LpGgPSmat60FazSLGShZYQOPW%2FkCAc%2FjQCf97QP6c6afqsh4cD1zUYnCh3Wp%2B3gntf6itnMjMUD8MSGgC5wCcKXdSY8DjAnA%2B2T78nvRbIEKbP69lXXLg22M%2BjQraO6afqpEujbuL2l%2FexikDVVx4RGm7don%2FHbEnr4pfXTaRUsslVbvBnwEHAlGQxZr0lOUr2sR5HU9xfctkDnJo0%2FNbvh36bEsLXvdjQ%3D%3D',
	},
	{
		id: 'xb5b2EhUxmpaxibNWFVm',
		name: 'Colidep',
		description: 'De primă intenție în colicile abdominale datorită compoziției unice.',
		logoUrl:
			'https://storage.googleapis.com/dr-phyto.appspot.com/assets/xb5b2EhUxmpaxibNWFVm-logo?GoogleAccessId=firebase-adminsdk-mon4o%40dr-phyto.iam.gserviceaccount.com&Expires=16447017600&Signature=o9BJsjb0V%2FSvnnxjNfd21uelf7k%2FAfADpuhUKgTqiGOHqJva%2Fi6iEpmZEyANqQGxI%2FNiHA9qNCoZ%2FHj39T28U3MKvVvW3H4MkkPi%2FqAqAygxjoX09UnWt2qER9SqLmbT4YP4pfiN1qFZdaZ2tntrpUaQphQl%2BEnbmyEcxWGXEk3Jt%2F0rukr74kQE8wO3GDX6Z3k7VnocdYDsM8MBIAMMXFp7DouE%2B1H9rnHYflSBQm5Q0w4%2BRrKQQn6iDULBFyCYefT5Fh3HRfK1lloLD3lcuXHDwsXJpFP1OFFsGPxEiduD8vCvTkwGh%2FGqEyxRNrWaVNR33xpnXlWWBJC%2FkYOx2A%3D%3D',
	},
];

export async function POST() {
	const db = getFirestore(firebaseServerApp);

	await Promise.all(
		products.map(async (product) => {
			await db.collection('products').doc(product.id).set(product);
		})
	);

	return new Response('Products uploaded successfully');
}
