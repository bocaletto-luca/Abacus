 "use strict";
    
    // Place values for a 6-digit abacus (leftmost to rightmost)
    const placeValues = [100000, 10000, 1000, 100, 10, 1];

    // After page load, attach event listeners to all beads.
    window.onload = function() {
      const beads = document.querySelectorAll(".bead");
      beads.forEach(bead => {
        bead.addEventListener("click", function() {
          const type = bead.getAttribute("data-type");
          if (type === "upper") {
            // Simply toggle the upper bead.
            bead.classList.toggle("active");
          } else if (type === "lower") {
            const col = bead.closest(".abacus-column");
            const lowerBeads = col.querySelectorAll(".lower-bead");
            // Get index of clicked lower bead.
            const clickedIndex = parseInt(bead.getAttribute("data-index"));
            // Activate beads with index <= clickedIndex, deactivate the others.
            lowerBeads.forEach(b => {
              const idx = parseInt(b.getAttribute("data-index"));
              if (idx <= clickedIndex) {
                b.classList.add("active");
              } else {
                b.classList.remove("active");
              }
            });
          }
          updateAbacusValue();
        });
      });
    };

    // Compute and update the abacus value and update each column's contribution label.
    function updateAbacusValue() {
      const columns = document.querySelectorAll(".abacus-column");
      let total = 0;
      const n = columns.length;
      columns.forEach((col, i) => {
        let digit = 0;
        const upper = col.querySelector(".upper-bead");
        if (upper.classList.contains("active")) digit += 5;
        const lowerBeads = col.querySelectorAll(".lower-bead");
        lowerBeads.forEach(lb => {
          if (lb.classList.contains("active")) digit += 1;
        });
        const place = Math.pow(10, (n - 1 - i));
        total += digit * place;
        const colValueDiv = col.querySelector(".col-value");
        colValueDiv.innerText = digit * place;
      });
      document.getElementById("abacusValue").innerText = "Abacus Value: " + total;
    }

    // Reset all beads
    function resetAbacus() {
      const beads = document.querySelectorAll(".bead");
      beads.forEach(b => b.classList.remove("active"));
      updateAbacusValue();
    }
