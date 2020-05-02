import { getAllPageIds, getPageData } from '../lib/pages'
import Head from 'next/head'
import Layout from '../components/layout'

export default function Page({ pageData }) {
    return (
        <Layout>
          <Head>
            <title>{pageData.title}</title>
          </Head>
          <header style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url(${pageData.banner_image})`}}>
              <div class="container">
                <h1>{pageData.title}</h1>
              </div>
          </header>
          <main>
            {pageData.content_blocks.map(({ template, heading, content, background_image, blocks, index }) => (
              <div key={index}>
                { template === 'content-section' &&
                  <section>
                    <div className="container">
                      <h2 className="brand-primary">{heading}</h2>
                      <div>{content}</div>
                    </div>
                  </section>
                }
                { template === 'promo' &&
                  <section style={{backgroundImage: `linear-gradient(rgba(0,0,0,0.25),rgba(0,0,0,0.25)),url(${background_image})`}}>
                      <div class="container align-center promo-block">
                        <h2>{heading}</h2>
                        <div>{content}</div>
                      </div>
                  </section>
                }
                { template === 'horizontal-group' &&
                  <section>
                    <div className="container flex-row">
                    {
                      blocks.map(({main_image, title, content, index}) => (
                        <div className="card" key={index}>
                            <img src={main_image} alt="" />
                            <div className="card-body">
                              <h3 className="brand-primary">{title}</h3>
                              <div>{content}</div>
                            </div> 
                        </div>
                      ))
                    }
                    </div>
                  </section>
                }
              </div>
            ))}

          </main>
        </Layout>
    );
  }

  function HorizontalGroup(props){
     const items = props.items.map((main_image, title, content) => 
      <div className="container">
        <h2>{title}</h2>
        <div>{content}</div>
        <img src={main_image} />
      </div>
    )
    return(
      {items}
    )
  }

  export async function getStaticPaths() {
    const paths = getAllPageIds()
    return {
      paths,
      fallback: false
    }
  }

  export async function getStaticProps({ params }) {
    const pageData = getPageData(params.id)
    return {
      props: {
        pageData
      }
    }
  }