module.exports = [
"[project]/src/data/menu-items.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "menuItems",
    ()=>menuItems
]);
const menuItems = [
    {
        id: "crown-crust",
        name: "Crown Crust",
        description: "Signature stuffed crust loaded with molten cheez and our special blend.",
        category: "Pizza",
        priceNumber: 1499,
        priceDisplay: "Rs. 1,499"
    },
    {
        id: "beasty-burger",
        name: "Beasty Burger",
        description: "Double patty, triple cheez, crispy onion rings, and our beast sauce.",
        category: "Burger",
        priceNumber: 699,
        priceDisplay: "Rs. 699"
    },
    {
        id: "bihari-roll",
        name: "Bihari Roll",
        description: "Tender Bihari kabab wrapped in paratha with cheez and chutney.",
        category: "Roll",
        priceNumber: 449,
        priceDisplay: "Rs. 449"
    },
    {
        id: "cheezy-volcano",
        name: "Cheezy Volcano Pizza",
        description: "Triple-cheez lava, loaded toppings, crisp golden crust.",
        category: "Pizza",
        priceNumber: 1799,
        priceDisplay: "Rs. 1,799"
    },
    {
        id: "smash-burger-double",
        name: "Smash Burger Double",
        description: "Two smashed patties, American cheez, pickles, and special sauce.",
        category: "Burger",
        priceNumber: 849,
        priceDisplay: "Rs. 849"
    },
    {
        id: "loaded-platter",
        name: "Loaded Platter",
        description: "Wings, tenders, cheezy fries, and dips — perfect for sharing.",
        category: "Platter",
        priceNumber: 1299,
        priceDisplay: "Rs. 1,299"
    },
    {
        id: "cheezy-fries",
        name: "Cheezy Fries",
        description: "Crispy fries smothered in our signature cheez sauce.",
        category: "Sides",
        priceNumber: 349,
        priceDisplay: "Rs. 349"
    }
];
}),
"[project]/src/components/MenuSection.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "MenuSection",
    ()=>MenuSection
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/context/CartContext.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$menu$2d$items$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/menu-items.ts [app-ssr] (ecmascript)");
"use client";
;
;
;
function MenuSection() {
    const { addItem, openSidebar } = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$context$2f$CartContext$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCart"])();
    const handleAdd = (item)=>{
        addItem(item);
        openSidebar();
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "mx-auto max-w-6xl px-4 pb-12 md:px-6 md:pb-16",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col items-start justify-between gap-4 md:flex-row md:items-end",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-xl font-bold tracking-tight text-cheez-ink md:text-2xl",
                            children: "Our Menu"
                        }, void 0, false, {
                            fileName: "[project]/src/components/MenuSection.tsx",
                            lineNumber: 18,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                            className: "mt-1 text-sm text-cheez-ink/70 md:text-base",
                            children: "Hand-picked cheez hits. Add to cart and we'll get it to you hot."
                        }, void 0, false, {
                            fileName: "[project]/src/components/MenuSection.tsx",
                            lineNumber: 21,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/MenuSection.tsx",
                    lineNumber: 17,
                    columnNumber: 9
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/MenuSection.tsx",
                lineNumber: 16,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "mt-6 grid gap-4 sm:grid-cols-2 md:mt-8 lg:grid-cols-3",
                children: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$menu$2d$items$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["menuItems"].map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "group flex flex-col rounded-3xl border border-white/60 bg-gradient-to-br from-cheez-card to-cheez-bg/90 p-4 shadow-[0_18px_45px_rgba(15,23,42,0.12)] transition-transform hover:-translate-y-1 hover:shadow-[0_30px_80px_rgba(15,23,42,0.18)]",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-1 flex-col gap-2",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "inline-flex w-fit rounded-full bg-cheez-red/10 px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.2em] text-cheez-red",
                                        children: item.category
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MenuSection.tsx",
                                        lineNumber: 34,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                        className: "text-lg font-semibold text-cheez-ink",
                                        children: item.name
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MenuSection.tsx",
                                        lineNumber: 37,
                                        columnNumber: 15
                                    }, this),
                                    item.description && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        className: "text-sm text-cheez-ink/70 line-clamp-2",
                                        children: item.description
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MenuSection.tsx",
                                        lineNumber: 41,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MenuSection.tsx",
                                lineNumber: 33,
                                columnNumber: 13
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mt-4 flex items-center justify-between gap-3",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-base font-bold text-cheez-ink md:text-lg",
                                        children: item.priceDisplay
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MenuSection.tsx",
                                        lineNumber: 47,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        type: "button",
                                        onClick: ()=>handleAdd(item),
                                        className: "rounded-full bg-cheez-red px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-cheez-white shadow-md transition-colors hover:bg-[#d52f3b]",
                                        children: "Add to Cart"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/MenuSection.tsx",
                                        lineNumber: 50,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/MenuSection.tsx",
                                lineNumber: 46,
                                columnNumber: 13
                            }, this)
                        ]
                    }, item.id, true, {
                        fileName: "[project]/src/components/MenuSection.tsx",
                        lineNumber: 29,
                        columnNumber: 11
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/components/MenuSection.tsx",
                lineNumber: 27,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/MenuSection.tsx",
        lineNumber: 15,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=src_f2d7b8a9._.js.map