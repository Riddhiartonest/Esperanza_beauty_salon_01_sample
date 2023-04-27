
(function(global) {

	class SalonspyWidget {

		constructor(widgetData) {

			this._widgetData = widgetData;

			this._widgetThemes = {
				blue: {logo: `salonspy-logo--coloured`, class: 'salonspy-bubble--cyan', fill: '#5EC4D1'},
				purple: {logo: 'salonspy-logo--white', class: 'salonspy-bubble--purple', fill: '#4D246A'},
				grey: {logo: 'salonspy-logo--coloured', class: 'salonspy-bubble--grey', fill: '#FAFAFA'}
			};

			this._ratingWidths = {
				'0.0': '0', '0.5': '9',
				'1.0': '18', '1.5': '30',
				'2.0': '39', '2.5': '51',
				'3.0': '60', '3.5': '71.5',
				'4.0': '80', '4.5': '91.5',
				'5.0': '100'
			};

			// Determine the current theme or default to grey.
			this._activeTheme = this._widgetThemes.hasOwnProperty(this._widgetData.theme) ? this._widgetThemes[this._widgetData.theme] : this._widgetThemes['grey'];

			// Process and inject all widgets.
			let widgetSelector = `.salonspy-widget[data-token="${this._widgetData.token}"]:not([data-injected])`;
			document.querySelectorAll(widgetSelector).forEach(w => this._injectTemplate(w));
		}

		/**
		 * Injects the HTML content for the widget.
		 * @param w The parent DOM Node for the widget.
		 */
		_injectTemplate(w) {

			w.setAttribute('data-injected', 'yes');

			if (window.innerWidth > 768) {
				w.style.maxHeight = '550px';
			}

			let widgetType = 'badge';
			if (w.getAttribute('data-type') && ['badge', 'carousel'].indexOf(w.getAttribute('data-type')) > -1) {
				widgetType = w.getAttribute('data-type');
			}

			if (
				widgetType == "carousel" &&
				(!this._widgetData.reviews || !this._widgetData.reviews.length)
			) {
				return;
			}

			let widgetSandbox = document.createElement('iframe');
			widgetSandbox.style.border = 'none';
			widgetSandbox.style.height = widgetType == 'carousel' ?  '609px' : '257px';
			widgetSandbox.style.width = widgetType == 'carousel' ? '100%' : '250px';
			w.appendChild(widgetSandbox);

			let containerDocument = widgetSandbox.contentDocument;
			containerDocument.write(this._sandboxedDocument(widgetType));
			containerDocument.close();

		}

		/**
		 * Template part: Stars
		 */
		_templateStarSVG(rating, dark) {
			rating = rating || this._widgetData.rating;
			return `
				<div class="stars stars--${rating.toString().replace('.','-').replace('-0', '')}"></div>
			`;
		}

		_sandboxedDocument(widgetType) {
			return `
				<!doctype html>
				<html>
					<head>
						<title>salonspy widget</title>
						<style type="text/css">html,body{margin: 0; padding: 0; overflow: hidden;}</style>
						<link rel="stylesheet" type="text/css" href="${this._widgetData.base}widgets/dist/css/shared.css?v=8" />
						<link rel="stylesheet" type="text/css" href="${this._widgetData.base}widgets/dist/css/badge.css?v=8" />
						<link rel="stylesheet" type="text/css" href="${this._widgetData.base}widgets/dist/css/carousel.css?v=8" />
					</head>
					<body>
						<div class="salonspy-widget salonspy-widget--${this._widgetData.theme}">
							${widgetType == 'carousel' ? this._carouselTemplate() : this._badgeTemplate()}
						</div>

						<script type="text/javascript" src="${this._widgetData.base}widgets/dist/js/carousel.js"></script>
					</body>
				</html>
			`;
		}

		_templateCarouselSlides() {
			return this._widgetData.reviews.map(review => `
				<div class="salonspy-carousel__slide">
					<a target="_blank" href="${this._widgetData.salonPermalink}read-review/${review.id}${this._widgetData.salonPermalinkUTM}" class="salonspy-carousel__card">
						<div class="salonspy-carousel__card-top">
							<div>
								<div class="salonspy-stars salonspy-stars--left">${this._templateStarSVG(review.rating.toFixed(1), true)}</div>
							</div>
							<div class="salonspy-carousel__card-title">${review.title}</div>
							${review.verified ? '<div class="salonspy-carousel__card-verified">Verified appointment</div>' : ''}
						</div>
						<div class="salonspy-carousel__card-bottom">
							<div class="salonspy-carousel__card-review">${review.description}</div>
							<div class="salonspy-carousel__card-reviewer">${review.reviewer_name}</div>
							<div class="salonspy-carousel__card-date">${review.created}</div>
						</div>
					</a>
				</div>
			`).join('');
		}

		_badgeTemplate() {
			return `
				<div class="salonspy-bubble ${this._activeTheme.class}">
					<div class="salonspy-bubble__inner">
						<div class="salonspy-bubble__rating-title">${this._widgetData.rating >= 4.5 ? 'Excellent' : '&nbsp'}</div>
						<div class="salonspy-stars">${ this._templateStarSVG() }</div>
						<div class="salonspy-bubble__stats">
							<div class="salonspy-bubble__rating">${this._widgetData.rating}</div>
							<a target="_blank" href="${this._widgetData.salonPermalink}${this._widgetData.salonPermalinkUTM}" class="salonspy-bubble__review-count">216 reviews</a>
						</div>
						<div class="salonspy-logo ${this._activeTheme.logo}"></div>
					</div>
				</div>
			`;
		}

		_carouselTemplate() {
			return `
				<div class="salonspy-carousel">
					<div class="salonspy-carousel__title">Customer Reviews</div>
					<div class="salonspy-carousel__overview">
						<div class="salonspy-carousel__overview-ranking">
							<div class="salonspy-carousel__overview-title">${this._widgetData.rating >= 4.5 ? 'Excellent' : '&nbsp'}</div>
							<div class="salonspy-stars">${ this._templateStarSVG() }</div>
						</div>
						<div class="salonspy-carousel__overview-count">
							Based on <a target="_blank" href="${this._widgetData.salonPermalink}${this._widgetData.salonPermalinkUTM}">${this._widgetData.reviewCount} reviews</a> for ${this._widgetData.salonName} on salonspy
						</div>
						<div class="salonspy-carousel__overview-logo salonspy-logo salonspy-logo--coloured"></div>
					</div>

					<div class="salonspy-carousel__carousel-container">
						<button class="salonspy-carousel__arrow salonspy-carousel__arrow--left"></button>
						<button class="salonspy-carousel__arrow salonspy-carousel__arrow--right"></button>
						<div class="salonspy-carousel__carousel">
							<div class="salonspy-carousel__slides">${this._templateCarouselSlides()}</div>
							<div class="salonspy-carousel__indicators"></div>
						</div>
					</div>
				</div>
			`;
		}
	}

	// Instantiate the widget class with the current salon's data.
	window.addEventListener('load', () => {
		new SalonspyWidget({
			base: 'https://www.salonspy.com/',
			theme: 'grey',
			rating: '5.0',
			salonName: 'Taylor Taylor London - Shoreditch',
			reviewCount: '216',
			reviews: JSON.parse('[{\"id\":584743,\"salon_id\":80027,\"apievent_token\":\"\",\"title\":\"Great haircut and service by Hannah \",\"description\":\"I enjoyed a service provided by Hannah under supervision of Chie. I really liked the haircut style but also the way how I was treated. \\r\\n\\r\\nHannah was diligent and professional but also attentive to my preferences.\\r\\n\\r\\nAlso, the interior of Taylor Taylor is very nice.\\r\\n\\r\\nHighly recommend this salon.\\r\\n\",\"reviewer_name\":\"Helen\",\"created\":\"19th Apr 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":false},{\"id\":583526,\"salon_id\":80027,\"apievent_token\":\"b540cc5d3a190a4878a01ff03cd2c409\",\"title\":\"Great consultation and education\",\"description\":\"Thanks Tom for dedicating such attention to detail and explaining all the different points of styling too. Great cut and leaving very happy!\",\"reviewer_name\":\"Stacey Smith\",\"created\":\"15th Apr 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":580365,\"salon_id\":80027,\"apievent_token\":\"73e1414b1a86963bb7e5ca19c9273bea\",\"title\":\"Colour  and cut \",\"description\":\"Anna Wiig  has been my stylist for a number of years, consistently amazing , super professional and very experienced \",\"reviewer_name\":\"Deana Shadbolt - Farrell\",\"created\":\"12th Apr 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":578681,\"salon_id\":80027,\"apievent_token\":\"\",\"title\":\"Cut \",\"description\":\"Amazing cut, service and espresso martini\'s! Mihaela always listens to what I would like, gives great advice and I always get a cut that makes my hair look it\'s best. Mihaela also styles it beautifully. I always look forward to getting my haircut at Taylor Taylor Shoreditch, it\'s always a great experience from start to finish. Thank you. \",\"reviewer_name\":\"Sally Nevard\",\"created\":\"09th Apr 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":false},{\"id\":574933,\"salon_id\":80027,\"apievent_token\":\"a6ffdf5fed1279fce11c76278de4bda8\",\"title\":\"Wonderful experience\",\"description\":\"Sonya was very polite and caring throughout. Listened to exactly what I wanted. Great result!\",\"reviewer_name\":\"Deniz Ozer\",\"created\":\"07th Apr 2023\",\"rating\":4.5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":570930,\"salon_id\":80027,\"apievent_token\":\"b122ab3691d66c222495f1aa1360a6bc\",\"title\":\"Highlites \",\"description\":\"Lovely Salon , very friendly staff & so glad I finally got an appointment with Anna Wigg , in the Shoreditch branch.\\r\\nShe\\u2019s an amazingly talented colourist\\/ stylist with  great listening skills \\u2026 a true professional who cares about her clients. \\r\\nShe knows exactly what you want and delivers. \\r\\nExtremely happy and I can\\u2019t wait until my next appointment. \",\"reviewer_name\":\"Mary Hopkins\",\"created\":\"30th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":568226,\"salon_id\":80027,\"apievent_token\":\"d4b9e754e33549cdc06a1cced23fe71f\",\"title\":\"Lovely chat, even better haircut \",\"description\":\"I ended up with Tom by pure accident as I had written down the wrong time for my app and missed it by an hour. As I came in from outside of London, I was offered an alternative app with Tom. We had a great chat and although I was Tom\\u2018s last client that day, he really took the time to listen to what I wanted and gave me some really great tips how to style my new bob. Very happy, will be going back.  \",\"reviewer_name\":\"Tanja Jones\",\"created\":\"26th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":568173,\"salon_id\":80027,\"apievent_token\":\"caab8c334fc511df92419a30d6c37d0d\",\"title\":\"Best stylist ever! \",\"description\":\"He was amazing, a lot of concentration on details I loved it, I will definitely come back anytime. Thank you Tom for this amazing haircut I am in love with it!\",\"reviewer_name\":\"Reka Dragulici\",\"created\":\"26th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":567750,\"salon_id\":80027,\"apievent_token\":\"cdd6ae36cd743e7b256c6699a4a22535\",\"title\":\"Taylor and Taylor Great value \",\"description\":\"Lovely service and great haircut\",\"reviewer_name\":\"Margaret Whittaker\",\"created\":\"25th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":564405,\"salon_id\":80027,\"apievent_token\":\"cdbfa44ac71c16f1dc72131eefec7625\",\"title\":\"Great haircut from Francesca \",\"description\":\"\\r\\nI love that she really listened to what I\\u2019m after and then made sure to make it happen. \\r\\nFrancesca was very attentive and kind. \\r\\nI left the salon with a great haircut, thank you!\\r\\n\",\"reviewer_name\":\"Kari\",\"created\":\"16th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":562356,\"salon_id\":80027,\"apievent_token\":\"\",\"title\":\"Fringe trim \",\"description\":\"Receptionists are kind and friendly.\\r\\nThey put me through to Stylist quickly and Stylist she was lovely to cut my fringe nicely. Thank you \",\"reviewer_name\":\"\",\"created\":\"12th Mar 2023\",\"rating\":4.5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":false},{\"id\":562241,\"salon_id\":80027,\"apievent_token\":\"e433f8822d2f0af947f010283796dfee\",\"title\":\"Great salon!\",\"description\":\"As always Annelie offers a service that is well thought out and professional. She is incredibly knowledgeable when it comes to colour and colouring. Needless to say the results are spot on and I trust her opinion blindly. Another big bonus is that she is the loveliest of people and there\\u2019s never a dull moment in her company! \\ud83e\\udd70\",\"reviewer_name\":\"Vesna Miric\",\"created\":\"12th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":559944,\"salon_id\":80027,\"apievent_token\":\"b0282650323cd15345063b884d7180a4\",\"title\":\"Monthly cut\",\"description\":\"Very professional and quick. Nice ambience  and good chats \",\"reviewer_name\":\"Mungo Tennant\",\"created\":\"08th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":558772,\"salon_id\":80027,\"apievent_token\":\"\",\"title\":\"Always a pleasure \",\"description\":\"I always have a great experience at Taylor Taylor Shoreditch. I don\\u2019t usually enjoy getting my hair cut, but I genuinely enjoy going to Taylor Taylor as the staff are warm and welcoming, cocktails delicious and my haircut is always great! \\r\\n\\r\\nLaura is very professional and always kind. The reception staff are great and very accommodating. \",\"reviewer_name\":\"Saskia\",\"created\":\"05th Mar 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":false},{\"id\":553069,\"salon_id\":80027,\"apievent_token\":\"44b7423a437d032d688db0c5a5e08fbc\",\"title\":\"Hair colour\",\"description\":\"Brilliant service as always! \",\"reviewer_name\":\"Noreen Ali\",\"created\":\"26th Feb 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":550876,\"salon_id\":80027,\"apievent_token\":\"ce250e5aebee99ab7019d5a69b57479a\",\"title\":\"Last minute haircut \",\"description\":\"Antonio was  professional and very good at his job. Love my new haircut. \",\"reviewer_name\":\"Eszti Takacs\",\"created\":\"24th Feb 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":550866,\"salon_id\":80027,\"apievent_token\":\"07528ecd0f3096c936349036ddb0cf8d\",\"title\":\"Highly recommended \",\"description\":\"Absolutely love it. Francesca did a great job! Will visit again\",\"reviewer_name\":\"Lily Yin\",\"created\":\"24th Feb 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":544690,\"salon_id\":80027,\"apievent_token\":\"4b4f288d4574d737fb525644185b307c\",\"title\":\"Wonderful experience \",\"description\":\"A very lovely experience, super talented hairdresser, luxurious products, welcoming people.\",\"reviewer_name\":\"Ellie Roberts\",\"created\":\"16th Feb 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":542450,\"salon_id\":80027,\"apievent_token\":\"791450a8c1b6a42935427557e371dae6\",\"title\":\"Always the best\",\"description\":\"Jordan\\u2019s always absolutely incredible at what he does, and everyone at the salon is so lovely.\",\"reviewer_name\":\"Bryony Gibbs\",\"created\":\"11th Feb 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":true},{\"id\":514646,\"salon_id\":80027,\"apievent_token\":\"\",\"title\":\"Thank you Antonio! \",\"description\":\"I read that this is the best hairdresser salon in London and it certainly doesn\\u2019t disappoint. A gorgeous salon with a superb  service and an intuitive stylist (Antonio) who took time and effort with the cut. I will definitely return! \",\"reviewer_name\":\"Tara\",\"created\":\"14th Jan 2023\",\"rating\":5,\"ApiEvents\":{},\"ApiPartners\":{},\"verified\":false}]').slice(0,20),
			salonPermalink: `https://www.salonspy.com/en-gb/in/greater-london/spitalfields/taylor-taylor-london/`,
			salonPermalinkUTM: `?utm_source=widget&utm_medium=website&utm_campaign=Taylor Taylor London - Shoreditch`,
			token: `a9ffcdcf6f9b6c2ec6394a58a62df03b`
		});
	});



})();
