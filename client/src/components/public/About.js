import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import './About.css';

const About = () => {
    return (
        <Fragment>
            <h1 className="main-content-heading">Блог не туралы?</h1>
			<p className="about-blog-brief-description">
				Бұл жай ғана блог. Бұны біз &#8220;Web&#8211;интерфейсін әзірлеу&#8221; мен &#8220;Web&#8211;қосымшасы өңдеу&#8221; пәндерінен өткен тақырыптарды бекіту үшін әзірледік</p>
			<article className="about-blog">
				<h1 className="about-blog-heading">Блогтың өзі неден тұрады?</h1>
				<p className="about-blog-content">Блогтың оқырмандарына екі бет ұсынылады. <Link className="about-link" to="/">Басты бетте</Link> блогтағы посттар тізім ретінде ұсынылады. Посттардың саны көп болса, автоматты жүктеу арқылы тізім динамикалық түрде толықтырылатын болады. Екіншіден, осы блог туралы ақпаратты көруге болатын бет.</p>
				<p className="about-blog-content">Әкімшілік үшін жағдай мүлдем бөлек. Алдымен әкімшілік панеліне кіретін бетке өту қажет. Сол жерде аутентификациядан өтсе, әкімшілік аймағы ашылады. Онда жаңа пост жазу, дайын постты өңдеу немесе жою мүмкіндіктері үшін сәйкес беттер ұсынылады.</p>
				<section className="about-blog-content sources">
					<h1 className="sources-title">Қолданылған әдебиеттер тізімі:</h1>
					<ul className="about-blog-content source-list">
						<li className="source-list-item">
                            <a className="about-link source-link" 
							href="https://philipwalton.github.io/solved-by-flexbox/demos/sticky-footer/" 
							target="_blank">Sticky footer</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://www.codegrepper.com/code-examples/javascript/react+router+link+onclick" 
							target="_blank">React useHistory().push to redirect</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://roytuts.com/react-rest-delete-example/" 
							target="_blank">React REST DELETE example</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://postsrc.com/code-snippets/how-to-make-patch-request-with-fetch-api" 
							target="_blank">Fetch API. PATCH</a>
						</li>
                        <li className="source-list-item">
							<a className="about-link source-link" 
							href="https://reactgo.com/react-get-url-params/" 
							target="_blank">React get parameters of the route</a>
						</li>
                        <li className="source-list-item">
							<a className="about-link source-link" 
							href="https://stackoverflow.com/questions/7290504/which-html5-tag-should-i-use-to-mark-up-an-author-s-name" 
							target="_blank">HTML element for marking a blog's author</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://stackoverflow.com/questions/42253277/react-router-v4-how-to-get-current-route" 
							target="_blank">React. How to get the current path from the URL</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://stackoverflow.com/questions/38481829/postgresql-character-with-byte-sequence-0xc2-0x81-in-encoding-utf8-has-no-equ" 
							target="_blank">PostgresSQL. Set the encoding</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://stackoverflow.com/questions/37849514/react-router-auto-redirect-any-route-to-root-except-for-main" 
							target="_blank">React. Redirect any routes to the root route except specified ones</a>
						</li>
						<li className="source-list-item">
							<a className="about-link source-link" 
							href="https://blog.bitsrc.io/4-ways-to-communicate-across-browser-tabs-in-realtime-e4f5f6cbedca" 
							target="_blank">JavaScript. Communicate across browser tabs.</a>
						</li>
						
					</ul>
				</section>
			</article>
        </Fragment>
    );
};

export default About;