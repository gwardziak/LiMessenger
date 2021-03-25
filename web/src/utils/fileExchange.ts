import { Exchange } from "@urql/core";
import { extractFiles } from "extract-files";
import { print } from "graphql";
import { filter, pipe } from "wonka";

const fileExchange: Exchange = ({ forward }) => {
  return (ops$) => {
    const preFlight$ = pipe(
      ops$,
      filter((operation) => {
        if (operation.kind !== "mutation") {
          return true;
        }

        if (!operation.variables.files) {
          return true;
        }

        //Upload file
        const { url } = operation.context;
        const { files, clone: variables } = extractFiles({
          ...operation.variables,
        });

        const extraOptions =
          typeof operation.context.fetchOptions === "function"
            ? operation.context.fetchOptions()
            : operation.context.fetchOptions || {};

        const fetchOptions: RequestInit = {
          method: "POST",
          headers: {
            ...extraOptions.headers,
          },
        };

        fetchOptions.body = new FormData();

        fetchOptions.body.append(
          "operations",
          JSON.stringify({
            query: print(operation.query),
            variables,
          })
        );

        const map: { [key: number]: string[] } = {};
        let i: number = 0;
        files.forEach((paths) => {
          map[i++] = paths.map((path) => `variables.${path}`);
        });

        fetchOptions.body.append("map", JSON.stringify(map));

        i = 0;
        files.forEach((_, file: any) => {
          (fetchOptions.body as FormData).append(`${i++}`, file, file.name);
        });

        fetch(url, fetchOptions)
          .then((res) => res.json())
          .then((json) => console.log(json));

        return false;
      })
    );

    return forward(preFlight$);
  };
};

export default fileExchange;
