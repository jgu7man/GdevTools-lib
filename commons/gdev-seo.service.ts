import { Injectable, Inject, Renderer2, RendererFactory2 } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';
import { DOCUMENT } from '@angular/common';
import { Router, ActivatedRoute, NavigationEnd } from '@angular/router';
import { filter, map } from 'rxjs/operators';

@Injectable({ providedIn: 'root'})
export class SeoService {
    private render: Renderer2

    constructor(
        private meta: Meta,
        private title: Title,
        // private readonly ngxmeta: MetaService,
        private renderFac: RendererFactory2,
        @Inject( DOCUMENT ) private document: any,
        private readonly router: Router,
        private readonly activatedRoute: ActivatedRoute,
    ) {
        this.render = this.renderFac.createRenderer( null, null )
        // this.setupRouting()
    }
    
    generarTags( config: SEOCONFIG ) {
        var defaultConfig: SEOCONFIG = {
            title: 'Las motos',
            description: 'Concesionario de Motos y Repuestos Auteco | Crédito fácil y rápida!!! | Promociones y descuentos permanentes',
            image: 'https://tiendalasmotos.com/assets/img/lasmotos-isotipo-transp-1x1.png',
            keywords: 'auteco las motos, taller de motos, venta de motos, motos fácil manejo, motos electricas, motocarros, auteco, brilla, credito, crédito para motos',
            slug:'',
        }
        
        config.keywords = 
        !config.keywords ? 
        config.title ?
        config.title + ', ' + defaultConfig.keywords
        :    defaultConfig.keywords
        :    config.keywords + ', ' + defaultConfig.keywords
        config.title = config.title ? `${defaultConfig.title} - ${config.title}` : defaultConfig.title
        config.description = config.description ? config.description : defaultConfig.description
        config.image = config.image ? config.image : defaultConfig.image
        config.slug = config.slug ? config.slug : defaultConfig.slug

        
        
        this.setTitleTags( config.title )
        this.setMetaTag( 'description', config.description.substring( 0, 199 ) )
        this.setMetaTag( 'image', config.image )
        
        this.setKeywords(config.keywords)
        this.setSlug(config.slug)
        

    }

   

    setTitleTags( title: string ) {
        let tag = this.meta.getTag( 'name="twitter:title"' )
        this.setTitle( title )
        if ( tag ) {
            this.meta.updateTag( { name: 'twitter:title', content: title } )
            this.meta.updateTag( { property: `og:title`, content: title } )
        } else {
            this.renderMetaTag('twitter:title', title)
            this.renderMetaTag( 'og:title', title )
        }
    }

    setMetaTag( name, content ) {
        let tag = this.meta.getTag( `name="${ name }"` )
        if ( !tag ) {
            this.renderMetaTag( name, content )
            this.renderMetaTag( `twitter:${ name }`, content )
            this.renderMetaTag( `og:${ name }`, content )
        } else {
            this.meta.updateTag( { name: name, content: content } )
            this.meta.updateTag( { name: `twitter:${ name }`, content: content } )
            this.meta.updateTag( { property: `og:${ name }`, content: content } )
        }
        
    }

    setKeywords( keywords ) {
        let tag = this.meta.getTag( `name="keywords"` )
        if ( !tag ) {
            this.renderMetaTag( 'keywords', keywords )
            
        } else {
            this.meta.updateTag( { name: 'keywords', content: keywords } )

        }
    }

    setSlug( slug ) {
        let tag = this.meta.getTag( `name="og:slug"` )
        if ( !tag ) {
            this.renderMetaTag( 'og:slug', `https://tiendalasmotos.com/${ slug }` )

        } else {
            this.meta.updateTag( { name: 'og:slug', content: `https://tiendalasmotos.com/${ slug }` } )

        }
    }

    renderMetaTag( name:string, content:string ) {
        let meta = this.render.createElement( 'meta' )
        if ( name.includes( 'og' ) ) {
            this.render.setAttribute(meta, 'property', name)
        } else {
            meta.name = name
        }
        meta.content = content
        this.render.appendChild( document.head, meta )
    }


    capitalize( text: string, lower = false ) {
        return ( lower ? text.toLowerCase() : text ).replace( /(?:^|\s|["'([{])+\S/g, match => match.toUpperCase() );
    }

    setTitle( text ) {
        this.title.setTitle( this.capitalize( text ) )
    }


    


    
}

export interface SEOCONFIG {
    title: string,
    description?: string,
    keywords?: string,
    image?: string,
    slug?: string
}