package mefpai.gouv.sn.web.rest;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.List;
import java.util.Objects;
import java.util.Optional;
import javax.validation.Valid;
import javax.validation.constraints.NotNull;
import mefpai.gouv.sn.domain.Recette;
import mefpai.gouv.sn.repository.RecetteRepository;
import mefpai.gouv.sn.security.SecurityUtils;
import mefpai.gouv.sn.service.RecetteService;
import mefpai.gouv.sn.web.rest.errors.BadRequestAlertException;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpHeaders;
// import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.support.ServletUriComponentsBuilder;
import tech.jhipster.web.util.HeaderUtil;
import tech.jhipster.web.util.PaginationUtil;
import tech.jhipster.web.util.ResponseUtil;

/**
 * REST controller for managing {@link mefpai.gouv.sn.domain.Recette}.
 */
@RestController
@RequestMapping("/api")
public class RecetteResource {

    private final Logger log = LoggerFactory.getLogger(RecetteResource.class);

    private static final String ENTITY_NAME = "recette";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final RecetteService recetteService;

    private final RecetteRepository recetteRepository;

    public RecetteResource(RecetteService recetteService, RecetteRepository recetteRepository) {
        this.recetteService = recetteService;
        this.recetteRepository = recetteRepository;
    }

    /**
     * {@code POST  /recettes} : Create a new recette.
     *
     * @param recette the recette to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new recette, or with status {@code 400 (Bad Request)} if the recette has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/recettes")
    public ResponseEntity<Recette> createRecette(@Valid @RequestBody Recette recette) throws URISyntaxException {
        log.debug("REST request to save Recette : {}", recette);
        if (recette.getId() != null) {
            throw new BadRequestAlertException("A new recette cannot already have an ID", ENTITY_NAME, "idexists");
        }
        Recette result = recetteService.save(recette);
        return ResponseEntity
            .created(new URI("/api/recettes/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /recettes/:id} : Updates an existing recette.
     *
     * @param id the id of the recette to save.
     * @param recette the recette to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recette,
     * or with status {@code 400 (Bad Request)} if the recette is not valid,
     * or with status {@code 500 (Internal Server Error)} if the recette couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/recettes/{id}")
    public ResponseEntity<Recette> updateRecette(
        @PathVariable(value = "id", required = false) final Long id,
        @Valid @RequestBody Recette recette
    ) throws URISyntaxException {
        log.debug("REST request to update Recette : {}, {}", id, recette);
        if (recette.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recette.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recetteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Recette result = recetteService.save(recette);
        return ResponseEntity
            .ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, recette.getId().toString()))
            .body(result);
    }

    /**
     * {@code PATCH  /recettes/:id} : Partial updates given fields of an existing recette, field will ignore if it is null
     *
     * @param id the id of the recette to save.
     * @param recette the recette to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated recette,
     * or with status {@code 400 (Bad Request)} if the recette is not valid,
     * or with status {@code 404 (Not Found)} if the recette is not found,
     * or with status {@code 500 (Internal Server Error)} if the recette couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PatchMapping(value = "/recettes/{id}", consumes = "application/merge-patch+json")
    public ResponseEntity<Recette> partialUpdateRecette(
        @PathVariable(value = "id", required = false) final Long id,
        @NotNull @RequestBody Recette recette
    ) throws URISyntaxException {
        log.debug("REST request to partial update Recette partially : {}, {}", id, recette);
        if (recette.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        if (!Objects.equals(id, recette.getId())) {
            throw new BadRequestAlertException("Invalid ID", ENTITY_NAME, "idinvalid");
        }

        if (!recetteRepository.existsById(id)) {
            throw new BadRequestAlertException("Entity not found", ENTITY_NAME, "idnotfound");
        }

        Optional<Recette> result = recetteService.partialUpdate(recette);

        return ResponseUtil.wrapOrNotFound(
            result,
            HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, recette.getId().toString())
        );
    }

    /**
     * {@code GET  /recettes} : get all the recettes.
     *
     * @param pageable the pagination information.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of recettes in body.
     */
    @GetMapping("/recettes")
    public ResponseEntity<List<Recette>> getAllRecettes(Pageable pageable) {
        log.debug("REST request to get a page of Recettes");
        if (SecurityUtils.hasCurrentUserThisAuthority("ROLE_ADMIN")) {
            Page<Recette> page = recetteService.findAll(pageable);
            HttpHeaders headers = PaginationUtil.generatePaginationHttpHeaders(ServletUriComponentsBuilder.fromCurrentRequest(), page);
            return ResponseEntity.ok().headers(headers).body(page.getContent());
        }
        return ResponseEntity
            .ok()
            .headers(
                PaginationUtil.generatePaginationHttpHeaders(
                    ServletUriComponentsBuilder.fromCurrentRequest(),
                    (recetteService.findByUserIsCurrentUser(pageable))
                )
            )
            .body((recetteRepository.findByUserIsCurrentUser(pageable)).getContent());
    }

    /**
     * {@code GET  /recettes/:id} : get the "id" recette.
     *
     * @param id the id of the recette to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the recette, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/recettes/{id}")
    public ResponseEntity<Recette> getRecette(@PathVariable Long id) {
        log.debug("REST request to get Recette : {}", id);
        Optional<Recette> recette = recetteService.findOne(id);
        return ResponseUtil.wrapOrNotFound(recette);
    }

    /**
     * {@code DELETE  /recettes/:id} : delete the "id" recette.
     *
     * @param id the id of the recette to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/recettes/{id}")
    public ResponseEntity<Void> deleteRecette(@PathVariable Long id) {
        log.debug("REST request to delete Recette : {}", id);
        recetteService.delete(id);
        return ResponseEntity
            .noContent()
            .headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString()))
            .build();
    }
}
