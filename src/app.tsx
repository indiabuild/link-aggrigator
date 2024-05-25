/*
  This License shall apply to "All Source Under This Project"
  Copyright 2024 - PRESENT IndiaBuild Contributors

  Licensed under the Apache License, Version 2.0 (the "License");
  you may not use this file except in compliance with the License.
  You may obtain a copy of the License at

      http://www.apache.org/licenses/LICENSE-2.0

  Unless required by applicable law or agreed to in writing, software
  distributed under the License is distributed on an "AS IS" BASIS,
  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
  See the License for the specific language governing permissions and
  limitations under the License.
*/

import { Router } from "@solidjs/router";
import { Title, Meta, MetaProvider, Link } from "@solidjs/meta";
import { FileRoutes } from "@solidjs/start/router";
import { Suspense } from "solid-js";
import Nav from "~/components/Nav";
import "./app.css";

export default function App() {
  return (
    <Router
      explicitLinks
      root={(props) => (
        <MetaProvider>
          <Title>IndiaBuild</Title>

          <Meta name="icon" content="/favicon.ico" />

          <Meta
            property="og:image"
            content="https://i.imgur.com/sumxqkx.jpeg"
          />
          <Meta property="og:image:alt" content="IndiaBuild" />
          <Meta property="og:image:width" content="1200" />
          <Meta property="og:image:height" content="600" />
          <Meta property="og:site_name" content="IndiaBuild" />

          <Nav />
          <Suspense>{props.children}</Suspense>
        </MetaProvider>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
