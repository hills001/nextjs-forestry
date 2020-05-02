import { getAllPageIds, getPageData } from '../lib/pages'

export default function Page({ pageData }) {
    return (
        <>
          <header>
            <h1>{pageData.title}</h1>
            <img src={pageData.banner_image} />
          </header>
          <main>
            {pageData.content_blocks.map(({ block_type, title, content, main_image }) => (
              <section>
                <h2>{title}</h2>
                <div>{content}</div>
                <img src={main_image} />
              </section>
            ))}

          </main>
        </>
    );
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