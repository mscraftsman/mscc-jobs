<template>
  <div class="body__container generic__view">
    <HeadingBreadcrumbs :breadcrumbs="breadcrumbs" pageTitle="About" :alertStatus="false"/>

    <div class="container__fw">
      <div class="block__content styled__content">
        <div class="body__content">
          <h2>Generic page content</h2>

          <p>
            This page was typed by hand. Anybody can do this, you don't need any
            special "web creation" tools or HTML editors, and the pages you make can be
            viewed from any browser. To see how this page was made, choose
            <b>View Source</b> (or View Page Source, or View Document Source) in your
            browser's menu. A simple web page like this one is just plain text with
            HTML commands (markup) mixed in. HTML commands themselves are plain text.
          </p>

          <ul>
            <li>A gromet</li>
            <li>A widget</li>
            <li>
              A framus, which consists of the following components:
              <ul>
                <li>A doohickey.</li>
                <li>
                  A veeblefetzer -- these come in several colors:
                  <ul>
                    <li>Purple</li>
                    <li>Purple</li>
                    <li>Purple</li>
                  </ul>
                </li>
                <li>A whatchamacallit.</li>
              </ul>
            </li>
            <li>A doodad.</li>
          </ul>

          <h1>Heading One</h1>
          <h2>Heading Two</h2>
          <h3>Heading Three</h3>
          <h4>Heading Four</h4>

          <p>Most Web pages are created by hideous bloated "Web Authoring" tools, which are designed to force readers to use a Web browser (such as IE) that is made by the same company that made the Web-authoring tool (e.g. Front Page). If all you want is text with some pictures and links and maybe some tables, as opposed to spinning blinking popup holograms with streaming video and sound effects, it's best to keep it simple and do it yourself. This is how the Web started off in the HTML 1.0 days of the early 1990s. The ingenious thing was that it was self propogating. If you saw a web page with a certain effect and wanted to know how it was done, you could simply "view source" to get the "source code" and then adapt it to your own page. You can still do that with pages that look like this one, but since most Web pages are no longer made by hand, you'll often see tons of incomprehensible gibberish (the more special effects, the more gibberish).</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import HeadingBreadcrumbs from "@/components/shared/HeadingBreadcrumbs";

export default {
  components: {
    HeadingBreadcrumbs
  },
  data() {
    return {
      breadcrumbs: [
        {
          name: "About",
          path: "about"
        }
      ]
    };
  },
  metaInfo: {
    title: "About"
  }
};
</script>

<style lang="scss" scoped>
</style>
