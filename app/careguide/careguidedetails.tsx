import React from "react";

const careguidedetails: Record<
    string,
    { 
        title: string; 
        desc: string;
        sections: { 
            subtitle: string; 
            content:{title:string; text:string }[];
        }[]; 
        
        
    }
    > = {
  
       jewellery:{
            title:"Jewellery",
            desc:"Crafted with precision and cherished for their timeless elegance, Ciluna’s jewellery pieces are designed to accompany you through life’s most beautiful moments. To preserve their brilliance and ensure your treasured jewellery stands the test of time, we recommend the following care practices:",
            sections:[
                {
                    subtitle: "1. Gold Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gold jewellery is known for its enduring beauty, but it requires gentle care to keep its shine. To clean your gold jewellery, simply wipe it with a soft cloth after each wear to remove dust and natural oils. For a deeper clean, you can soak it in warm water (not exceeding 30°C) with a mild, non-abrasive soap. Avoid using harsh chemicals or abrasive brushes, as these can damage the delicate surface of the gold. After cleaning, make sure to dry your pieces thoroughly before polishing with a soft jewellery cloth for an added shine."
                        },
                         {
                            title:"Storage:",
                            text:" To preserve the pristine condition of your gold jewellery, store it in a pouch or jewellery box after use. This will help protect it from dust and scratches. It's important to keep each gold piece separate from other jewellery to prevent it from rubbing against and damaging other metals. Storing your jewellery in a cool, dry place is ideal for maintaining its integrity over time."
                        },
                        {
                            title:"Avoid:",
                            text:" Gold jewellery is sensitive to chlorine, so always remove it before swimming in pools or hot tubs. Exposure to harsh chemicals like bleach or cleaning agents can also cause damage to gold. Additionally, avoid wearing your gold jewellery while applying lotions, perfumes, or hairsprays to ensure the gold remains untouched by chemicals that can lead to tarnishing."
                        },

                    ]
                },
             {
                    subtitle: "2. Silver Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Silver jewellery naturally tarnishes over time due to exposure to air and moisture. To keep your silver pieces looking their best, regularly clean them with a soft, lint-free cloth. For deeper tarnish, a silver polish cloth or a mild soap and water solution can be used. Avoid using abrasive tools or cleaners, as these can scratch the surface of the silver. After cleaning, dry your silver thoroughly to avoid water spots."
                        },
                         {
                            title:"Storage:",
                            text:" Silver should be stored in a dry, cool environment, away from humidity and sunlight to prevent tarnishing. Consider using an anti-tarnish pouch or cloth when storing silver jewellery to help minimize exposure to air, which can cause oxidation. Always store silver pieces separately to avoid scratches from other jewellery items."
                        },
                        {
                            title:"Avoid:",
                            text:" Silver jewellery should be kept away from chemicals like perfumes, lotions, and cleaning products. These can cause the silver to tarnish more quickly. Additionally, it’s important to remove silver jewellery before swimming in chlorinated water or engaging in activities that might cause exposure to sweat, as both can accelerate tarnishing."
                        },

                    ]
                },
                {
                    subtitle: "3. Stainless Steel Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Stainless steel is a durable material that resists tarnishing and corrosion, but it still benefits from regular cleaning to keep its shine. Gently wipe your stainless steel jewellery with a damp cloth to remove dirt and oils. For more thorough cleaning, use a mild soap solution and a soft cloth. Avoid using abrasive cleaners or scouring pads, as these can scratch the surface of the jewellery. After cleaning, make sure to dry your stainless steel pieces completely with a soft cloth to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Stainless steel is resistant to tarnishing, but to prevent scratches, it’s still best to store your pieces in separate compartments in a jewellery box or pouch. A cool, dry environment is ideal for stainless steel, and it’s best to avoid keeping your pieces in areas with high humidity or direct sunlight."
                        },
                        {
                            title:"Avoid:",
                            text:": While stainless steel is highly resistant to corrosion, it’s still a good idea to avoid prolonged exposure to saltwater or harsh chemicals, as these can dull the surface of the jewellery. Always remove stainless steel jewellery before using strong cleaning agents, lotions, or perfumes to ensure the jewellery remains in top condition."
                        },

                    ]
                },
                {
                    subtitle: "4. Gemstone Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gemstone jewellery requires careful handling to maintain the vibrancy of the stones. Clean your gemstone jewellery gently using a soft, damp cloth to remove dirt and oils. For a deeper clean, use lukewarm water and a mild soap solution, but avoid using ultrasonic cleaners, especially for more delicate stones. Always ensure that you dry your jewellery thoroughly after cleaning to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" To prevent scratches and damage, store each gemstone piece separately from other jewellery. Keeping gemstones in a soft pouch or jewellery box will help protect them from abrasions. Additionally, storing gemstones in a cool, dry environment will help prevent discoloration or cracking caused by changes in temperature or humidity."
                        },
                        {
                            title:"Avoid:",
                            text:" Gemstones should not be exposed to harsh chemicals, including cleaning products, perfumes, or lotions, as these can damage the surface of the stones. Additionally, gemstones are vulnerable to physical damage, so always handle them with care and avoid knocking them against hard surfaces."
                        },

                    ]
                },
                {
                    subtitle: "5. Pearl Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Pearls are delicate and require the gentlest care. After wearing, wipe your pearls with a soft cloth to remove any oils or dirt. Avoid using water or cleaning agents, as moisture can damage the surface of the pearls. When necessary, clean pearls with a damp cloth, but ensure they are not soaked in water. Always let your pearls air dry before storing them."
                        },
                            {
                            title:"Storage:",
                            text:"  To preserve the lustre of your pearls, always store them separately from other jewellery. Keep them in a soft pouch or a fabric-lined jewellery box. Avoid storing pearls in direct sunlight or areas with high humidity, as these can cause the pearls to lose their sheen and vibrancy."
                        },
                        {
                            title:"Avoid:",
                            text:" Pearls should be kept away from perfumes, lotions, and other chemicals, as these can damage the delicate surface. Additionally, pearls should not be exposed to high temperatures or harsh cleaning methods, as these can affect their natural lustre. Always remove pearls before swimming or bathing to protect them from moisture damage."
                        },

                    ]
                },
                                {
                    subtitle: "6. Copper Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Copper jewellery can develop a natural patina over time, which many people find appealing. However, if you prefer to maintain the original shine, clean your copper pieces with a soft cloth or a mild solution of lemon juice and baking soda. Gently rub the mixture on the jewellery and rinse thoroughly with water. Afterward, dry your copper jewellery completely to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Store copper jewellery in a dry place, away from moisture and humidity. To prevent tarnishing, consider using an anti-tarnish cloth or pouch. Keep your copper jewellery separate from other pieces to avoid scratching or abrasion."
                        },
                        {
                            title:"Avoid:",
                            text:"  Copper jewellery should not be exposed to water for long periods, as moisture can accelerate tarnishing. Avoid wearing copper pieces when using lotions, perfumes, or cleaning products, as these can cause the metal to discolor or tarnish faster."
                        },

                    ]
                },
                

            ]
},
       readytowear:{
            title:"Jewellery",
            desc:"Crafted with precision and cherished for their timeless elegance, Ciluna’s jewellery pieces are designed to accompany you through life’s most beautiful moments. To preserve their brilliance and ensure your treasured jewellery stands the test of time, we recommend the following care practices:",
            sections:[
                {
                    subtitle: "1. Gold Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gold jewellery is known for its enduring beauty, but it requires gentle care to keep its shine. To clean your gold jewellery, simply wipe it with a soft cloth after each wear to remove dust and natural oils. For a deeper clean, you can soak it in warm water (not exceeding 30°C) with a mild, non-abrasive soap. Avoid using harsh chemicals or abrasive brushes, as these can damage the delicate surface of the gold. After cleaning, make sure to dry your pieces thoroughly before polishing with a soft jewellery cloth for an added shine."
                        },
                         {
                            title:"Storage:",
                            text:" To preserve the pristine condition of your gold jewellery, store it in a pouch or jewellery box after use. This will help protect it from dust and scratches. It's important to keep each gold piece separate from other jewellery to prevent it from rubbing against and damaging other metals. Storing your jewellery in a cool, dry place is ideal for maintaining its integrity over time."
                        },
                        {
                            title:"Avoid:",
                            text:" Gold jewellery is sensitive to chlorine, so always remove it before swimming in pools or hot tubs. Exposure to harsh chemicals like bleach or cleaning agents can also cause damage to gold. Additionally, avoid wearing your gold jewellery while applying lotions, perfumes, or hairsprays to ensure the gold remains untouched by chemicals that can lead to tarnishing."
                        },

                    ]
                },
             {
                    subtitle: "2. Silver Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Silver jewellery naturally tarnishes over time due to exposure to air and moisture. To keep your silver pieces looking their best, regularly clean them with a soft, lint-free cloth. For deeper tarnish, a silver polish cloth or a mild soap and water solution can be used. Avoid using abrasive tools or cleaners, as these can scratch the surface of the silver. After cleaning, dry your silver thoroughly to avoid water spots."
                        },
                         {
                            title:"Storage:",
                            text:" Silver should be stored in a dry, cool environment, away from humidity and sunlight to prevent tarnishing. Consider using an anti-tarnish pouch or cloth when storing silver jewellery to help minimize exposure to air, which can cause oxidation. Always store silver pieces separately to avoid scratches from other jewellery items."
                        },
                        {
                            title:"Avoid:",
                            text:" Silver jewellery should be kept away from chemicals like perfumes, lotions, and cleaning products. These can cause the silver to tarnish more quickly. Additionally, it’s important to remove silver jewellery before swimming in chlorinated water or engaging in activities that might cause exposure to sweat, as both can accelerate tarnishing."
                        },

                    ]
                },
                {
                    subtitle: "3. Stainless Steel Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Stainless steel is a durable material that resists tarnishing and corrosion, but it still benefits from regular cleaning to keep its shine. Gently wipe your stainless steel jewellery with a damp cloth to remove dirt and oils. For more thorough cleaning, use a mild soap solution and a soft cloth. Avoid using abrasive cleaners or scouring pads, as these can scratch the surface of the jewellery. After cleaning, make sure to dry your stainless steel pieces completely with a soft cloth to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Stainless steel is resistant to tarnishing, but to prevent scratches, it’s still best to store your pieces in separate compartments in a jewellery box or pouch. A cool, dry environment is ideal for stainless steel, and it’s best to avoid keeping your pieces in areas with high humidity or direct sunlight."
                        },
                        {
                            title:"Avoid:",
                            text:": While stainless steel is highly resistant to corrosion, it’s still a good idea to avoid prolonged exposure to saltwater or harsh chemicals, as these can dull the surface of the jewellery. Always remove stainless steel jewellery before using strong cleaning agents, lotions, or perfumes to ensure the jewellery remains in top condition."
                        },

                    ]
                },
                {
                    subtitle: "4. Gemstone Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gemstone jewellery requires careful handling to maintain the vibrancy of the stones. Clean your gemstone jewellery gently using a soft, damp cloth to remove dirt and oils. For a deeper clean, use lukewarm water and a mild soap solution, but avoid using ultrasonic cleaners, especially for more delicate stones. Always ensure that you dry your jewellery thoroughly after cleaning to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" To prevent scratches and damage, store each gemstone piece separately from other jewellery. Keeping gemstones in a soft pouch or jewellery box will help protect them from abrasions. Additionally, storing gemstones in a cool, dry environment will help prevent discoloration or cracking caused by changes in temperature or humidity."
                        },
                        {
                            title:"Avoid:",
                            text:" Gemstones should not be exposed to harsh chemicals, including cleaning products, perfumes, or lotions, as these can damage the surface of the stones. Additionally, gemstones are vulnerable to physical damage, so always handle them with care and avoid knocking them against hard surfaces."
                        },

                    ]
                },
                {
                    subtitle: "5. Pearl Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Pearls are delicate and require the gentlest care. After wearing, wipe your pearls with a soft cloth to remove any oils or dirt. Avoid using water or cleaning agents, as moisture can damage the surface of the pearls. When necessary, clean pearls with a damp cloth, but ensure they are not soaked in water. Always let your pearls air dry before storing them."
                        },
                            {
                            title:"Storage:",
                            text:"  To preserve the lustre of your pearls, always store them separately from other jewellery. Keep them in a soft pouch or a fabric-lined jewellery box. Avoid storing pearls in direct sunlight or areas with high humidity, as these can cause the pearls to lose their sheen and vibrancy."
                        },
                        {
                            title:"Avoid:",
                            text:" Pearls should be kept away from perfumes, lotions, and other chemicals, as these can damage the delicate surface. Additionally, pearls should not be exposed to high temperatures or harsh cleaning methods, as these can affect their natural lustre. Always remove pearls before swimming or bathing to protect them from moisture damage."
                        },

                    ]
                },
                                {
                    subtitle: "6. Copper Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Copper jewellery can develop a natural patina over time, which many people find appealing. However, if you prefer to maintain the original shine, clean your copper pieces with a soft cloth or a mild solution of lemon juice and baking soda. Gently rub the mixture on the jewellery and rinse thoroughly with water. Afterward, dry your copper jewellery completely to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Store copper jewellery in a dry place, away from moisture and humidity. To prevent tarnishing, consider using an anti-tarnish cloth or pouch. Keep your copper jewellery separate from other pieces to avoid scratching or abrasion."
                        },
                        {
                            title:"Avoid:",
                            text:"  Copper jewellery should not be exposed to water for long periods, as moisture can accelerate tarnishing. Avoid wearing copper pieces when using lotions, perfumes, or cleaning products, as these can cause the metal to discolor or tarnish faster."
                        },

                    ]
                },
                

            ]
},
       leathergoods:{
            title:"Jewellery",
            desc:"Crafted with precision and cherished for their timeless elegance, Ciluna’s jewellery pieces are designed to accompany you through life’s most beautiful moments. To preserve their brilliance and ensure your treasured jewellery stands the test of time, we recommend the following care practices:",
            sections:[
                {
                    subtitle: "1. Gold Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gold jewellery is known for its enduring beauty, but it requires gentle care to keep its shine. To clean your gold jewellery, simply wipe it with a soft cloth after each wear to remove dust and natural oils. For a deeper clean, you can soak it in warm water (not exceeding 30°C) with a mild, non-abrasive soap. Avoid using harsh chemicals or abrasive brushes, as these can damage the delicate surface of the gold. After cleaning, make sure to dry your pieces thoroughly before polishing with a soft jewellery cloth for an added shine."
                        },
                         {
                            title:"Storage:",
                            text:" To preserve the pristine condition of your gold jewellery, store it in a pouch or jewellery box after use. This will help protect it from dust and scratches. It's important to keep each gold piece separate from other jewellery to prevent it from rubbing against and damaging other metals. Storing your jewellery in a cool, dry place is ideal for maintaining its integrity over time."
                        },
                        {
                            title:"Avoid:",
                            text:" Gold jewellery is sensitive to chlorine, so always remove it before swimming in pools or hot tubs. Exposure to harsh chemicals like bleach or cleaning agents can also cause damage to gold. Additionally, avoid wearing your gold jewellery while applying lotions, perfumes, or hairsprays to ensure the gold remains untouched by chemicals that can lead to tarnishing."
                        },

                    ]
                },
             {
                    subtitle: "2. Silver Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Silver jewellery naturally tarnishes over time due to exposure to air and moisture. To keep your silver pieces looking their best, regularly clean them with a soft, lint-free cloth. For deeper tarnish, a silver polish cloth or a mild soap and water solution can be used. Avoid using abrasive tools or cleaners, as these can scratch the surface of the silver. After cleaning, dry your silver thoroughly to avoid water spots."
                        },
                         {
                            title:"Storage:",
                            text:" Silver should be stored in a dry, cool environment, away from humidity and sunlight to prevent tarnishing. Consider using an anti-tarnish pouch or cloth when storing silver jewellery to help minimize exposure to air, which can cause oxidation. Always store silver pieces separately to avoid scratches from other jewellery items."
                        },
                        {
                            title:"Avoid:",
                            text:" Silver jewellery should be kept away from chemicals like perfumes, lotions, and cleaning products. These can cause the silver to tarnish more quickly. Additionally, it’s important to remove silver jewellery before swimming in chlorinated water or engaging in activities that might cause exposure to sweat, as both can accelerate tarnishing."
                        },

                    ]
                },
                {
                    subtitle: "3. Stainless Steel Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Stainless steel is a durable material that resists tarnishing and corrosion, but it still benefits from regular cleaning to keep its shine. Gently wipe your stainless steel jewellery with a damp cloth to remove dirt and oils. For more thorough cleaning, use a mild soap solution and a soft cloth. Avoid using abrasive cleaners or scouring pads, as these can scratch the surface of the jewellery. After cleaning, make sure to dry your stainless steel pieces completely with a soft cloth to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Stainless steel is resistant to tarnishing, but to prevent scratches, it’s still best to store your pieces in separate compartments in a jewellery box or pouch. A cool, dry environment is ideal for stainless steel, and it’s best to avoid keeping your pieces in areas with high humidity or direct sunlight."
                        },
                        {
                            title:"Avoid:",
                            text:": While stainless steel is highly resistant to corrosion, it’s still a good idea to avoid prolonged exposure to saltwater or harsh chemicals, as these can dull the surface of the jewellery. Always remove stainless steel jewellery before using strong cleaning agents, lotions, or perfumes to ensure the jewellery remains in top condition."
                        },

                    ]
                },
                {
                    subtitle: "4. Gemstone Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gemstone jewellery requires careful handling to maintain the vibrancy of the stones. Clean your gemstone jewellery gently using a soft, damp cloth to remove dirt and oils. For a deeper clean, use lukewarm water and a mild soap solution, but avoid using ultrasonic cleaners, especially for more delicate stones. Always ensure that you dry your jewellery thoroughly after cleaning to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" To prevent scratches and damage, store each gemstone piece separately from other jewellery. Keeping gemstones in a soft pouch or jewellery box will help protect them from abrasions. Additionally, storing gemstones in a cool, dry environment will help prevent discoloration or cracking caused by changes in temperature or humidity."
                        },
                        {
                            title:"Avoid:",
                            text:" Gemstones should not be exposed to harsh chemicals, including cleaning products, perfumes, or lotions, as these can damage the surface of the stones. Additionally, gemstones are vulnerable to physical damage, so always handle them with care and avoid knocking them against hard surfaces."
                        },

                    ]
                },
                {
                    subtitle: "5. Pearl Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Pearls are delicate and require the gentlest care. After wearing, wipe your pearls with a soft cloth to remove any oils or dirt. Avoid using water or cleaning agents, as moisture can damage the surface of the pearls. When necessary, clean pearls with a damp cloth, but ensure they are not soaked in water. Always let your pearls air dry before storing them."
                        },
                            {
                            title:"Storage:",
                            text:"  To preserve the lustre of your pearls, always store them separately from other jewellery. Keep them in a soft pouch or a fabric-lined jewellery box. Avoid storing pearls in direct sunlight or areas with high humidity, as these can cause the pearls to lose their sheen and vibrancy."
                        },
                        {
                            title:"Avoid:",
                            text:" Pearls should be kept away from perfumes, lotions, and other chemicals, as these can damage the delicate surface. Additionally, pearls should not be exposed to high temperatures or harsh cleaning methods, as these can affect their natural lustre. Always remove pearls before swimming or bathing to protect them from moisture damage."
                        },

                    ]
                },
                                {
                    subtitle: "6. Copper Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Copper jewellery can develop a natural patina over time, which many people find appealing. However, if you prefer to maintain the original shine, clean your copper pieces with a soft cloth or a mild solution of lemon juice and baking soda. Gently rub the mixture on the jewellery and rinse thoroughly with water. Afterward, dry your copper jewellery completely to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Store copper jewellery in a dry place, away from moisture and humidity. To prevent tarnishing, consider using an anti-tarnish cloth or pouch. Keep your copper jewellery separate from other pieces to avoid scratching or abrasion."
                        },
                        {
                            title:"Avoid:",
                            text:"  Copper jewellery should not be exposed to water for long periods, as moisture can accelerate tarnishing. Avoid wearing copper pieces when using lotions, perfumes, or cleaning products, as these can cause the metal to discolor or tarnish faster."
                        },

                    ]
                },
                

            ]
},
       perfumes:{
            title:"Jewellery",
            desc:"Crafted with precision and cherished for their timeless elegance, Ciluna’s jewellery pieces are designed to accompany you through life’s most beautiful moments. To preserve their brilliance and ensure your treasured jewellery stands the test of time, we recommend the following care practices:",
            sections:[
                {
                    subtitle: "1. Gold Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gold jewellery is known for its enduring beauty, but it requires gentle care to keep its shine. To clean your gold jewellery, simply wipe it with a soft cloth after each wear to remove dust and natural oils. For a deeper clean, you can soak it in warm water (not exceeding 30°C) with a mild, non-abrasive soap. Avoid using harsh chemicals or abrasive brushes, as these can damage the delicate surface of the gold. After cleaning, make sure to dry your pieces thoroughly before polishing with a soft jewellery cloth for an added shine."
                        },
                         {
                            title:"Storage:",
                            text:" To preserve the pristine condition of your gold jewellery, store it in a pouch or jewellery box after use. This will help protect it from dust and scratches. It's important to keep each gold piece separate from other jewellery to prevent it from rubbing against and damaging other metals. Storing your jewellery in a cool, dry place is ideal for maintaining its integrity over time."
                        },
                        {
                            title:"Avoid:",
                            text:" Gold jewellery is sensitive to chlorine, so always remove it before swimming in pools or hot tubs. Exposure to harsh chemicals like bleach or cleaning agents can also cause damage to gold. Additionally, avoid wearing your gold jewellery while applying lotions, perfumes, or hairsprays to ensure the gold remains untouched by chemicals that can lead to tarnishing."
                        },

                    ]
                },
             {
                    subtitle: "2. Silver Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Silver jewellery naturally tarnishes over time due to exposure to air and moisture. To keep your silver pieces looking their best, regularly clean them with a soft, lint-free cloth. For deeper tarnish, a silver polish cloth or a mild soap and water solution can be used. Avoid using abrasive tools or cleaners, as these can scratch the surface of the silver. After cleaning, dry your silver thoroughly to avoid water spots."
                        },
                         {
                            title:"Storage:",
                            text:" Silver should be stored in a dry, cool environment, away from humidity and sunlight to prevent tarnishing. Consider using an anti-tarnish pouch or cloth when storing silver jewellery to help minimize exposure to air, which can cause oxidation. Always store silver pieces separately to avoid scratches from other jewellery items."
                        },
                        {
                            title:"Avoid:",
                            text:" Silver jewellery should be kept away from chemicals like perfumes, lotions, and cleaning products. These can cause the silver to tarnish more quickly. Additionally, it’s important to remove silver jewellery before swimming in chlorinated water or engaging in activities that might cause exposure to sweat, as both can accelerate tarnishing."
                        },

                    ]
                },
                {
                    subtitle: "3. Stainless Steel Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Stainless steel is a durable material that resists tarnishing and corrosion, but it still benefits from regular cleaning to keep its shine. Gently wipe your stainless steel jewellery with a damp cloth to remove dirt and oils. For more thorough cleaning, use a mild soap solution and a soft cloth. Avoid using abrasive cleaners or scouring pads, as these can scratch the surface of the jewellery. After cleaning, make sure to dry your stainless steel pieces completely with a soft cloth to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Stainless steel is resistant to tarnishing, but to prevent scratches, it’s still best to store your pieces in separate compartments in a jewellery box or pouch. A cool, dry environment is ideal for stainless steel, and it’s best to avoid keeping your pieces in areas with high humidity or direct sunlight."
                        },
                        {
                            title:"Avoid:",
                            text:": While stainless steel is highly resistant to corrosion, it’s still a good idea to avoid prolonged exposure to saltwater or harsh chemicals, as these can dull the surface of the jewellery. Always remove stainless steel jewellery before using strong cleaning agents, lotions, or perfumes to ensure the jewellery remains in top condition."
                        },

                    ]
                },
                {
                    subtitle: "4. Gemstone Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gemstone jewellery requires careful handling to maintain the vibrancy of the stones. Clean your gemstone jewellery gently using a soft, damp cloth to remove dirt and oils. For a deeper clean, use lukewarm water and a mild soap solution, but avoid using ultrasonic cleaners, especially for more delicate stones. Always ensure that you dry your jewellery thoroughly after cleaning to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" To prevent scratches and damage, store each gemstone piece separately from other jewellery. Keeping gemstones in a soft pouch or jewellery box will help protect them from abrasions. Additionally, storing gemstones in a cool, dry environment will help prevent discoloration or cracking caused by changes in temperature or humidity."
                        },
                        {
                            title:"Avoid:",
                            text:" Gemstones should not be exposed to harsh chemicals, including cleaning products, perfumes, or lotions, as these can damage the surface of the stones. Additionally, gemstones are vulnerable to physical damage, so always handle them with care and avoid knocking them against hard surfaces."
                        },

                    ]
                },
                {
                    subtitle: "5. Pearl Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Pearls are delicate and require the gentlest care. After wearing, wipe your pearls with a soft cloth to remove any oils or dirt. Avoid using water or cleaning agents, as moisture can damage the surface of the pearls. When necessary, clean pearls with a damp cloth, but ensure they are not soaked in water. Always let your pearls air dry before storing them."
                        },
                            {
                            title:"Storage:",
                            text:"  To preserve the lustre of your pearls, always store them separately from other jewellery. Keep them in a soft pouch or a fabric-lined jewellery box. Avoid storing pearls in direct sunlight or areas with high humidity, as these can cause the pearls to lose their sheen and vibrancy."
                        },
                        {
                            title:"Avoid:",
                            text:" Pearls should be kept away from perfumes, lotions, and other chemicals, as these can damage the delicate surface. Additionally, pearls should not be exposed to high temperatures or harsh cleaning methods, as these can affect their natural lustre. Always remove pearls before swimming or bathing to protect them from moisture damage."
                        },

                    ]
                },
                                {
                    subtitle: "6. Copper Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Copper jewellery can develop a natural patina over time, which many people find appealing. However, if you prefer to maintain the original shine, clean your copper pieces with a soft cloth or a mild solution of lemon juice and baking soda. Gently rub the mixture on the jewellery and rinse thoroughly with water. Afterward, dry your copper jewellery completely to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Store copper jewellery in a dry place, away from moisture and humidity. To prevent tarnishing, consider using an anti-tarnish cloth or pouch. Keep your copper jewellery separate from other pieces to avoid scratching or abrasion."
                        },
                        {
                            title:"Avoid:",
                            text:" Copper jewellery should not be exposed to water for long periods, as moisture can accelerate tarnishing. Avoid wearing copper pieces when using lotions, perfumes, or cleaning products, as these can cause the metal to discolor or tarnish faster."
                        },

                    ]
                },
                

            ]
},
       shoes:{
            title:"Jewellery",
            desc:"Crafted with precision and cherished for their timeless elegance, Ciluna’s jewellery pieces are designed to accompany you through life’s most beautiful moments. To preserve their brilliance and ensure your treasured jewellery stands the test of time, we recommend the following care practices:",
            sections:[
                {
                    subtitle: "1. Gold Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gold jewellery is known for its enduring beauty, but it requires gentle care to keep its shine. To clean your gold jewellery, simply wipe it with a soft cloth after each wear to remove dust and natural oils. For a deeper clean, you can soak it in warm water (not exceeding 30°C) with a mild, non-abrasive soap. Avoid using harsh chemicals or abrasive brushes, as these can damage the delicate surface of the gold. After cleaning, make sure to dry your pieces thoroughly before polishing with a soft jewellery cloth for an added shine."
                        },
                         {
                            title:"Storage:",
                            text:" To preserve the pristine condition of your gold jewellery, store it in a pouch or jewellery box after use. This will help protect it from dust and scratches. It's important to keep each gold piece separate from other jewellery to prevent it from rubbing against and damaging other metals. Storing your jewellery in a cool, dry place is ideal for maintaining its integrity over time."
                        },
                        {
                            title:"Avoid:",
                            text:" Gold jewellery is sensitive to chlorine, so always remove it before swimming in pools or hot tubs. Exposure to harsh chemicals like bleach or cleaning agents can also cause damage to gold. Additionally, avoid wearing your gold jewellery while applying lotions, perfumes, or hairsprays to ensure the gold remains untouched by chemicals that can lead to tarnishing."
                        },

                    ]
                },
             {
                    subtitle: "2. Silver Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Silver jewellery naturally tarnishes over time due to exposure to air and moisture. To keep your silver pieces looking their best, regularly clean them with a soft, lint-free cloth. For deeper tarnish, a silver polish cloth or a mild soap and water solution can be used. Avoid using abrasive tools or cleaners, as these can scratch the surface of the silver. After cleaning, dry your silver thoroughly to avoid water spots."
                        },
                         {
                            title:"Storage:",
                            text:" Silver should be stored in a dry, cool environment, away from humidity and sunlight to prevent tarnishing. Consider using an anti-tarnish pouch or cloth when storing silver jewellery to help minimize exposure to air, which can cause oxidation. Always store silver pieces separately to avoid scratches from other jewellery items."
                        },
                        {
                            title:"Avoid:",
                            text:" Silver jewellery should be kept away from chemicals like perfumes, lotions, and cleaning products. These can cause the silver to tarnish more quickly. Additionally, it’s important to remove silver jewellery before swimming in chlorinated water or engaging in activities that might cause exposure to sweat, as both can accelerate tarnishing."
                        },

                    ]
                },
                {
                    subtitle: "3. Stainless Steel Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Stainless steel is a durable material that resists tarnishing and corrosion, but it still benefits from regular cleaning to keep its shine. Gently wipe your stainless steel jewellery with a damp cloth to remove dirt and oils. For more thorough cleaning, use a mild soap solution and a soft cloth. Avoid using abrasive cleaners or scouring pads, as these can scratch the surface of the jewellery. After cleaning, make sure to dry your stainless steel pieces completely with a soft cloth to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Stainless steel is resistant to tarnishing, but to prevent scratches, it’s still best to store your pieces in separate compartments in a jewellery box or pouch. A cool, dry environment is ideal for stainless steel, and it’s best to avoid keeping your pieces in areas with high humidity or direct sunlight."
                        },
                        {
                            title:"Avoid:",
                            text:": While stainless steel is highly resistant to corrosion, it’s still a good idea to avoid prolonged exposure to saltwater or harsh chemicals, as these can dull the surface of the jewellery. Always remove stainless steel jewellery before using strong cleaning agents, lotions, or perfumes to ensure the jewellery remains in top condition."
                        },

                    ]
                },
                {
                    subtitle: "4. Gemstone Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Gemstone jewellery requires careful handling to maintain the vibrancy of the stones. Clean your gemstone jewellery gently using a soft, damp cloth to remove dirt and oils. For a deeper clean, use lukewarm water and a mild soap solution, but avoid using ultrasonic cleaners, especially for more delicate stones. Always ensure that you dry your jewellery thoroughly after cleaning to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" To prevent scratches and damage, store each gemstone piece separately from other jewellery. Keeping gemstones in a soft pouch or jewellery box will help protect them from abrasions. Additionally, storing gemstones in a cool, dry environment will help prevent discoloration or cracking caused by changes in temperature or humidity."
                        },
                        {
                            title:"Avoid:",
                            text:" Gemstones should not be exposed to harsh chemicals, including cleaning products, perfumes, or lotions, as these can damage the surface of the stones. Additionally, gemstones are vulnerable to physical damage, so always handle them with care and avoid knocking them against hard surfaces."
                        },

                    ]
                },
                {
                    subtitle: "5. Pearl Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:" Pearls are delicate and require the gentlest care. After wearing, wipe your pearls with a soft cloth to remove any oils or dirt. Avoid using water or cleaning agents, as moisture can damage the surface of the pearls. When necessary, clean pearls with a damp cloth, but ensure they are not soaked in water. Always let your pearls air dry before storing them."
                        },
                            {
                            title:"Storage:",
                            text:" To preserve the lustre of your pearls, always store them separately from other jewellery. Keep them in a soft pouch or a fabric-lined jewellery box. Avoid storing pearls in direct sunlight or areas with high humidity, as these can cause the pearls to lose their sheen and vibrancy."
                        },
                        {
                            title:"Avoid:",
                            text:" Pearls should be kept away from perfumes, lotions, and other chemicals, as these can damage the delicate surface. Additionally, pearls should not be exposed to high temperatures or harsh cleaning methods, as these can affect their natural lustre. Always remove pearls before swimming or bathing to protect them from moisture damage."
                        },

                    ]
                },
                                {
                    subtitle: "6. Copper Jewellery Care",
                    content:[
                        {
                            title:"Cleaning:",
                            text:"Copper jewellery can develop a natural patina over time, which many people find appealing. However, if you prefer to maintain the original shine, clean your copper pieces with a soft cloth or a mild solution of lemon juice and baking soda. Gently rub the mixture on the jewellery and rinse thoroughly with water. Afterward, dry your copper jewellery completely to avoid water spots."
                        },
                            {
                            title:"Storage:",
                            text:" Store copper jewellery in a dry place, away from moisture and humidity. To prevent tarnishing, consider using an anti-tarnish cloth or pouch. Keep your copper jewellery separate from other pieces to avoid scratching or abrasion."
                        },
                        {
                            title:"Avoid:",
                            text:"  Copper jewellery should not be exposed to water for long periods, as moisture can accelerate tarnishing. Avoid wearing copper pieces when using lotions, perfumes, or cleaning products, as these can cause the metal to discolor or tarnish faster."
                        },

                    ]
                },
                

            ]
},

    };
    export default careguidedetails;